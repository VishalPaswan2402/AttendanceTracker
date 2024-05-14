const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "aimee.bosco80@ethereal.email",
    pass: "Vy7TbcuKRp6NfQmFaw",
  },
});

async function otpSender(to,subject,text,html) {
  const info = await transporter.sendMail({
    from: '"Attendance Tracker" <maddison53@ethereal.email>',
    to,
    subject,
    text,
    html,
  });
  console.log("Send Successfully...");
}

module.exports={otpSender};