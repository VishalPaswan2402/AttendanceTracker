let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const Teacher = require('../../../models/teachers.js');
const {otpSender}=require("../../../middlewares/otpSender.js");
const {registerOtpMail}=require("../../../middlewares/registerOtpMail.js");

// Resend teacher otp mail...
router.get("/Resend-Teacher-OTP", async (req, res) => {
    const { username,teacherName,teacherId,teacherEmail,collegeName,subject1,password } = req.session.TechData;
    const genOtp = Math.floor(1000 + Math.random() * 9000);
    otpSender(teacherEmail, "Verification code for registration on Attendance Tracker.", " ", registerOtpMail(teacherName, genOtp));
    req.session.genOtp = genOtp;
    console.log(genOtp);
    let dataArray=[username,teacherName,teacherId,teacherEmail,collegeName,subject1,password,genOtp];
    req.flash("success","Verification code sent successfully.");
    res.render("teacher/verifyTeacherEmail.ejs",{dataArray});
});

// Teacher email verification...
router.post("/Verify-Teacher-Email-Code/:data",wrapAsync(async(req,res,next)=>{
    let{data}=req.params;
    let{code}=req.body;
    const dataArray = data.split(',');
    const password = dataArray[6];
    const codeValue = dataArray[7];
    if(code===codeValue){
        function capitalizeWords(str) {
            return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
                return match.toUpperCase();
            });
        }
        const originalString = dataArray[1];
        const capitalizedString = capitalizeWords(originalString);
        let newTeacher=new Teacher({username:dataArray[0],teacherName:capitalizedString,teacherId:dataArray[2],teacherEmail:dataArray[3],collegeName:dataArray[4],subject:dataArray[5].toUpperCase()});        
        let registerTeacher=await Teacher.register(newTeacher,password);
        let id=newTeacher._id;
        req.login(registerTeacher,(err)=>{
        if(err){
             return next(err);
        }
        req.flash("success","Account created successfully.");
        res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
        })
    }
    else{
        req.flash("error","You have entered incorrect verification code. Please try again later.");
        res.redirect("/");
    }
}));

module.exports=router;