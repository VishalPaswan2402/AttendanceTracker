const wrapAsync = require('../../../utility/wrapAsync.js');
const expressError=require("../../../utility/expressError.js");
const allCollege=require("../../../models/college.js");
const collegeAccount=require("../../../models/collegeAccount.js");
const {otpSender}=require("../../../middlewares/otpSender.js");
const {passwordOtpMail}=require("../../../middlewares/passwordOtpMail.js");

module.exports.forgetPage=async(req,res,next)=>{
    let colleges=await allCollege.find();
    return res.render("editCollege/forgetCollegePassword.ejs",{colleges});
};

module.exports.forgetFormData=async(req,res,next)=>{
    let{college,collegeType}=req.body;
    let currCollege=await collegeAccount.findOne({username:college,collegeType:collegeType});
    if(!currCollege){
        return next(new expressError(404,"College Not Found !"));
    }
    else{
        let toEmail=currCollege.eMail;
        let userName=currCollege.username;
        let subject="Verification code for password change on Attendance Tracker.";
        let genOtp=Math.floor(1000 + Math.random() * 9000);
        let otp=otpSender(toEmail,subject," ",passwordOtpMail(userName,genOtp));
        console.log(genOtp);
        return res.render("editCollege/verifyCollegeCode.ejs",{currCollege,genOtp});
    }
};

module.exports.verifyEmail=async(req,res,next)=>{
    let{id,pin}=req.params;
    let{code}=req.body;
    if(code===pin){
        let currCollege=await collegeAccount.findById(id);
        return res.render("editCollege/changeCollegePassword.ejs",{currCollege});
    }
    else{
        req.flash("error","You have entered incorrect code. Please try again later.");
        return res.redirect("/Attendence-Tracker/Forget-college-Password");
    }
};

module.exports.changePassword=async(req,res,next)=>{
    let{id}=req.params;
    let currCollege=await collegeAccount.findById(id);
    let{password}=req.body;
    await currCollege.setPassword(password);
    await currCollege.save();
    req.flash("success","Password changed successfully. You can now log in with your new password.");
    return res.redirect("/Attendence-Tracker/College-Login");
};