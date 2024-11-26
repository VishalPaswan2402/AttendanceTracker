const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.emailHost || "smtp.ethereal.email",
  secure: true,
  auth: {
    user: process.env.emailUser || 'wilfredo.pfannerstill38@ethereal.email' ,
    pass: process.env.emailPass || 'qwuZVm6BgVx8UcenyP' ,
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