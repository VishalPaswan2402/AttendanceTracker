const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "ignacio58@ethereal.email",
    pass: "JFpWFS4TXbnJ1r9Q2R",
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