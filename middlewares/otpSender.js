const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "alysa.keeling@ethereal.email",
    pass: "NZwgQsdqAXwPYPvCb9",
  },
});

async function otpSender(to,subject,text,html) {
  try{
    const info = await transporter.sendMail({
      from: '"Attendance Tracker" <maddison53@ethereal.email>',
      to,
      subject,
      text,
      html,
    });
    console.log("Send Successfully...");
    return { success: true, info };
  }
  catch(err){
    console.log(err);
    return { success: false, error: err };
  }
  
}

module.exports={otpSender};