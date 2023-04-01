const jwt = require('jsonwebtoken');

const crateActivataToken = (userInfo) =>{
  return jwt.sign({userInfo}, process.env.ACTIAVTION_TOKEN_SECRET,
                  { algorithm: "HS256",
                    expiresIn:"15min"}
                );       
};

const createAccessToken = (userInfo) => {

  return jwt.sign (userInfo,process.env.ACCESS_TOKEN_SECRET, 
    { algorithm: "HS256",
      expiresIn: "1d"}
  ); 
}; 

const createRefreshToken = (userInfo) => {
  
  return jwt.sign (userInfo,process.env.REFRESH_TOKEN_SECRET, 
                { algorithm: "HS256",
                  expiresIn: "14d"}
              ); 
}; 

const crateRestPasswordToken = (userinfo) =>{
  return jwt.sign(userinfo, process.env.FORGOT_PW_TOKEN_SECRT,
                  { algorithm: "HS256",
                    expiresIn:"15min"}
                );       
};

module.exports = {
  crateActivataToken,
  createAccessToken,
  createRefreshToken,
  crateRestPasswordToken
}