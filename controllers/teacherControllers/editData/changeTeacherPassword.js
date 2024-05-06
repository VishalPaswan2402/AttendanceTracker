const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const Teacher = require('../../../models/teachers.js');
const allCollege=require("../../../models/college.js");
const {otpSender}=require("../../../middlewares/otpSender.js");
const {passwordOtpMail}=require("../../../middlewares/passwordOtpMail.js");

module.exports.forgetPasswordPage=async(req,res,next)=>{
    let colleges=await allCollege.find();
    return res.render("editTeacher/forgetTeacherPassword.ejs",{colleges});
};

module.exports.forgetPasswordForm=async(req,res,next)=>{
    let{username,tEmail,college}=req.query;
    let findTech=await Teacher.findOne({username:username,teacherEmail:tEmail,collegeName:college});
    if(!findTech){
        return next(new expressError(404,"Teacher Not Found !"));
    }
    else{
        let toEmail=findTech.teacherEmail;
        let userName=findTech.username;
        let subject="Verification code for password change on Attendance Tracker.";
        let genOtp=Math.floor(1000 + Math.random() * 9000);
        let otp=otpSender(toEmail,subject," ",passwordOtpMail(userName,genOtp));
        console.log(genOtp);
        return res.render("editTeacher/verifyTeacherCode.ejs",{findTech,genOtp});
    }
};

module.exports.verifyOTP=async(req,res,next)=>{
    let{id,pin}=req.params;
    let{code}=req.body;
    if(code===pin){
        let findTech=await Teacher.findById(id);
        return res.render("editTeacher/changeTeacherPassword.ejs",{findTech});
    }
    else{
        req.flash("error","You have entered incorrect code. Please try again later.");
        return res.redirect("/Attendence-Tracker/Forgot-Teacher-Password");
    }
};

module.exports.changePassword=async(req,res,next)=>{
    let{id}=req.params;
    let currTech=await Teacher.findById(id);
    let{password}=req.body;
    await currTech.setPassword(password);
    await currTech.save();
    req.flash("success","Password changed successfully. You can now log in with your new password.");
    return res.redirect("/Attendence-Tracker/Teacher-Login");
};