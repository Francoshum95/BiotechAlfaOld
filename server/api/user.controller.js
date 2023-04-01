const bcrypt = require("bcrypt");
const cache = require('../services/cache.js');
const jwt = require('jsonwebtoken');
const JWTCreate = require('../auth/jwtToken.js');
const MailTem = require('../auth/mail/mailTep.js');
const SendMail = require('../auth/SendMail.js');

const defaultDuration = 60*15
let User 

const invalidReg = (userInfo) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (typeof userInfo.userID != 'string' || userInfo.userID .trim() === ''){
    return {status: false, message: "Please Enter Correct UserID"}
  } else if (userInfo.userID.length >= 13){
    return {status: false, message: "UserID Must Less Than or Equal 12 Characters"}
  } else if (re.test(userInfo.userEmail) === false || userInfo.userEmail.trim() === ''){
    return {status: false, message: "Please Enter Correct Email"}
  } else if (typeof userInfo.userComfirmPW != 'string' || userInfo.userComfirmPW.trim() ===''){
    return {status: false, message: "Please Enter Correct Password"}
  } else if (userInfo.userComfirmPW.length <6 && userInfo.userComfirmPW.length > 16){
    return {status: false, message: "Password Length Must Be Atleast 6 characters and Must Not Exceed 15 Characters"}
  } else if (userInfo.userPW !=userInfo.userComfirmPW){
    return {status: false, message: "Password and Confirmation Password Do Not Match"}
  } else{
    return {status: true}
  }
}


class userCtrl{

  static async injectDB(conn){
    if (User) {
      return
    }
    try {
      User = await conn.db(process.env.DB_NAME).collection(process.env.COLLCTION_USER)
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in User: ${e}`,
      )
    }
  }

  static async userRegister(req, res){
    try{
      const {userID, userEmail, userPW, userComfirmPW} = req.body
     
      const checkInvaild = invalidReg({userID, userEmail, userPW, userComfirmPW})
      
      if( !checkInvaild.status){
        return res.status(406).json(checkInvaild)
      } else if (await User.find({"user_id": userID}).count() > 0){
        return res.status(406).json({status: false, message: "UserID Already in Use"})
      } else if (await User.find({"user_email": userEmail.toLowerCase()}).count() > 0 ){
        return res.status(406).json({status: false, message: "Email Already in Use", })
      }

      const hash = await bcrypt.hashSync(userPW, 10);

      const userProfile = {
        user_id: userID, 
        user_email: userEmail.toLowerCase(),
        user_password: hash,
      }

      const activation_token = JWTCreate.crateActivataToken(userProfile) 
    
      const url = `${process.env.DOMAIN}/registration-activate/${activation_token}`

      await cache.saveWithTtl(userID, activation_token, defaultDuration)
      SendMail(userEmail, "Verification", MailTem.Reg(url));
      
      return res.status(200).json({status:true, message: "Please Check Your Verification Email"})

    }catch(err){
      console.log(err);
      return res.status(500).json({status: false, message: err})
    }
  }

  static async userActivateEmail(req, res){
    try{
      const {authorization} = req.headers
      const token = authorization.split(' ')[1];
      
      const {userInfo} = jwt.verify(token, process.env.ACTIAVTION_TOKEN_SECRET) 

      if (userInfo){
        const cachedData = await cache.get(userInfo.user_id);

        if(!cachedData){
          return res.status(406).json({status: false, message: 'Sorry, Your Token Has Expired'})
        } else if(cachedData != token){
          await cache.del(userInfo.user_id);
          return res.status(406).json({status: false, message: 'Sorry, We Do Not Have Your Registration Record'})
        }
        if (await User.find({"user_id": userInfo.user_id}).count() > 0){
          return res.status(406).json({status: false, message: 'Sorry, We Do Not Have Your Registration Record'})
        } else if (await User.find({"user_email": userInfo.user_email}).count() > 0 ){
          return res.status(406).json({status: false, message: 'Sorry, We Do Not Have Your Registration Record'})
        }

        if(cachedData!= token){
          return res.status(406).json({status: false, message: 'Sorry, We Do Not Have Your Registration Record'})
        }

        await cache.del(userInfo.user_id);

        const userProfile = {
          user_id: userInfo.user_id, 
          user_email: userInfo.user_email,
          user_password: userInfo.user_password,
        }
        
        await User.insertOne(userProfile)
        return res.status(200).json({status: true, message: "Congratulations Your Accaount Has Created, Please Login to BiotechAlfa"})
      }

    return res.status(406).json({status: false, message: 'Sorry, Your Token Has Expired'})
    } catch(err){
      console.log(err);
      return res.status(500).json({status: false, message: 'Sorry, We Do Not Have Your Registration Record'})
    };
  };

  static async userLogin(req, res){
    try{
      const {user_id, user_password, save} = req.body
      
      const projection = { user_id: 1,
        user_password: 1,
        tickers: 1
      }
      const userres = await User.find({user_id}).project(projection)
      const userarray = await userres.toArray()
      const userInfo = await userarray[0]

      if (userInfo){
        const hash = userInfo.user_password
        const validPassword = await bcrypt.compare(user_password, hash)
        
        if (validPassword){
          const asscesssToekn = JWTCreate.createAccessToken({user_id})
         
          const refreshToken = JWTCreate.createRefreshToken({user_id})

          if (save){
            res.cookie('BiotechAlfa', refreshToken, {
              httpOnly: true,
              Secure: true,
              path: '/', 
              maxAge: 14*24*60*60*1000
            })
          }
          return res.status(200).json({user:userInfo.user_id, status: true, message: `Wellcome Back ${user_id}`, accessToken: asscesssToekn, tickers:userInfo.tickers})
        }
      }
      return res.status(406).json({status: false, accessToken:false, message: "Please Check Your UserId and Password"})
    }catch(err){
      res.status(500).json({status: false,aaccessToken:false, message: err})
    } 
  }

  static async getAsscessToken(req, res){
    try{
      const refreshToken = req.cookies.BiotechAlfa
 
      
      if (!refreshToken){
        return res.status(400).json({status: false, message: "Your Session is expired, Please Login Again", accessToken:false})
      }

      const userInfo = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

      if (!userInfo){
        return res.status(400).json({status: false, message: "Your Session is expired, Please Login Again", accessToken: false})
      }

      const projection = { user_id: 1,
        tickers: 1
      }

      const userres = await User.find({user_id: userInfo.user_id}).project(projection)
      const userarray = await userres.toArray()
      const userInfoDB = await userarray[0]

      const accessToken = JWTCreate.createAccessToken({user_id: userInfo.user_id})

      return res.status(200).json({status: true, message:"OK", accessToken: accessToken, user:userInfo.user_id, tickers: userInfoDB.tickers})

    }catch(err){
      console.log(err);
      return res.status(500).json({status: false, message:err,  accessToken:false})
    }
  }

  static async reqRestpassword(req, res){
    try{
      const {user_email} = req.body
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      if (re.test(user_email) === false || user_email.trim() === ''){
        return res.status(406).json({status: false, message: "Please Enter A Correct Email"})
      }

      const projection = {user_id: 1}

      const userres = await User.find({user_email: user_email.toLowerCase()}).project(projection)
      const userarray = await userres.toArray()
      const userInfo = await userarray[0]

      if (userInfo){
        const activation_token = JWTCreate.crateRestPasswordToken(userInfo) 

        const url = `${process.env.DOMAIN}/forgot-password/activate/${activation_token}`

        await cache.saveWithTtl(userInfo.user_id, activation_token, defaultDuration)
        SendMail(user_email, "Reset Your Password", MailTem.Reset(url));
        
        return res.status(200).json({status:true, message: "Please Check Your Email to Reset Your Password"})

      }
      return res.status(200).json({status: true, message: "Please Check Your Email to Reset Your Password"})

    }catch(err){

      return res.status(200).json({status: true, message:  "Please Check Your Email to Reset Your Password"})
    }
  }

  static async restpasswordActivateEmail(req, res){
    try{
      const {authorization} = req.headers
      const token = authorization.split(' ')[1];
    
      const userInfo = jwt.verify(token, process.env.FORGOT_PW_TOKEN_SECRT)
     
      if(!userInfo){
        return res.status(406).json({status: false, mesage: "Sorry, We Do Not Have Your Account Record / Your Token Has Expired"})
      }

      const cachedData = await cache.get(userInfo.user_id)

      if(!cachedData){
        return res.status(406).json({status: false, message: 'Sorry, We Do Not Have Your Account Record / Your Token Has Expired'})
      } else if(cachedData != token){
        await cache.del(userInfo.user_id);
        return res.status(406).json({status: false, message: 'Sorry, We Do Not Have Your Account Record / Your Token Has Expired'})
      }

      const projection = {user_id: 1}

      const userres = await User.find({user_id: userInfo.user_id}).project(projection)
      const userarray = await userres.toArray()
      const userInfodata = await userarray[0]

      await cache.del(userInfo.user_id);

      if(!userInfodata){
        return res.status(406).json({status: false, message: 'Sorry, We Do Not Have Your Account Record / Your Token Has Expired'})
      }

      return res.status(200).json({status: true, message :"OK"})
    }catch(err){
      return res.status(500).json({status: false, message:  "Sorry, We Do Not Have Your Account Record / Your Token Has Expired"})
    }
  }

  static async restPassword(req, res){
    try{
      const {token, userPW, userComfirmPW} = req.body
     
      if (typeof userComfirmPW != 'string' || userComfirmPW.trim() ===''){
        return res.status(406).json({status: false, message: "Please Enter Correct Password", redirect: false})
      } else if (userComfirmPW.length <6 && userComfirmPW.length > 16){
        return res.status(406).json({status: false, message: "Password Length Must Be Atleast 6 characters and Must Not Exceed 15 Characters", redirect: false})
      } else if (userPW !=userComfirmPW){
        return res.status(406).json({status: false, message: "Password and Confirmation Password Do Not Match", redirect: false})
      }

      const userInfo = jwt.verify(token, process.env.FORGOT_PW_TOKEN_SECRT)

      if(userInfo){
        const hash = await bcrypt.hashSync(userPW, 10);

        await User.updateOne(
          {"user_id": userInfo.user_id}, 
          {"$set": {"user_password":hash}}, 
          {upsert: false}
        )
        return res.status(200).json({status: true, message: "Password Have Been Reset", redirect: true}) 
      }
      return res.status(406).json({status: false, message: 'Sorry, We Do Not Have Your Account Record / Your Token Has Expired', redirect: true}) 

    }catch(err){
      return res.status(500).json({status: false, message:  "Sorry, We Do Not Have Your Account Record / Your Token Has Expired", redirect: true})
    }
  }

  static async userLoginWithEmail(req, res){
    try{
      const {user_email, user_password, save} = req.body
      
      const userMail = user_email.toLowerCase()

      const projection = { user_id: 1,
        user_password: 1,
        tickers: 1
      }
      const userres = await User.find({user_email: userMail}).project(projection)
      const userarray = await userres.toArray()
      const userInfo = await userarray[0]
      

      if (userInfo){
        const user_id = userInfo.user_id
        const hash = userInfo.user_password
        const validPassword = await bcrypt.compare(user_password, hash)
        if (validPassword){
          const refreshToken = JWTCreate.createRefreshToken({user_id})
          const asscesssToekn = JWTCreate.createAccessToken({user_id})
          
          SendMail(user_email, "Your User Id", MailTem.SendUserId(user_id));

          if (save){
            res.cookie('BiotechAlfa', refreshToken, {
              httpOnly: true,
              path: '/', 
              secure: true,
              maxAge: 14*24*60*60*1000
            })
          }

          return res.status(200).json({user: user_id, status: true, message: `Wellcome Back ${user_id}`, accessToken: asscesssToekn, tickers:userInfo.tickers})
        }
      }
      return res.status(406).json({status: false, message: "Please Enter a Corret  Email or Password"})
    }catch(err){
      res.status(500).json({status: false, message: "Please Enter a Corret  Email or Password"})
    } 
  }

  static async userLogout(req, res){
    res.cookie("BiotechAlfa", "",
    {
      expires: new Date(Date.now()+1000),
      httpOnly: true,
      sameSite: 'none', 
      secure: true
    })  
    return res.json({status: 'logout'})
  }

  static async addTicker(req, res){
    try{
      const {userid, ticker} = req.body
    
      await User.updateOne({user_id: userid}, {
        $push: {
          tickers: ticker
        }
      })

      const projection = { 
        tickers: 1,
      }

      const tickerres = User.find({user_id: userid}).project(projection)
      const userarray = await tickerres.toArray()
      const userInfo = await userarray[0]

      return res.status(200).json({status: 'OK', tickers: userInfo.tickers})
    }catch(err){
      return res.status(500).json({status: false, message: err})
    }
  }

  static async removeTicker(req, res){
    try{
      const {userid, ticker} = req.body
      
      await User.updateOne({user_id: userid}, {
        $pull: {
          tickers: ticker
        }
      })

      const projection = { 
        tickers: 1,
      }

      const tickerres = User.find({user_id: userid}).project(projection)
      const userarray = await tickerres.toArray()
      const userInfo = await userarray[0]

      return res.status(200).json({status: 'OK', tickers: userInfo.tickers})
    }catch(err){
      console.log(err);
      return res.status(500).json({status: false, message: err})
    }
  }

} 


module.exports = userCtrl

