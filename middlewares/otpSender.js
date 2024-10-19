const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.emailUser,
    pass: process.env.emailPass,
  },
});

async function otpSender(to,subject,text,html) {
  try{
    const info = await transporter.sendMail({
      from: `"Attendance Tracker" <${process.env.emailUser}>`,
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