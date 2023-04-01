const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config();

const {
  SENDER_EMAIL_ADDRESS,
  SENDER_EAMIL_PW
} = process.env

const sendRegEmail = (to, subject, txt) => {
  const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: SENDER_EMAIL_ADDRESS,
          pass:SENDER_EAMIL_PW,
      }
  })

  const mailOptions = {
      from: {
        name: "BiotechAlfa", 
        address: SENDER_EMAIL_ADDRESS  
      },
      to: to,
      subject: subject,
      html: txt
  }

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    console.log(err, infor);
      if(err) return err;
      return infor
  })
 
}

module.exports = sendRegEmail




