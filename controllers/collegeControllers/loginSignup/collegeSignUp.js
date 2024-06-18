const expressError=require("../../../utility/expressError.js");
const allCollege=require("../../../models/college.js");
const collegeAccount=require("../../../models/collegeAccount.js");
const {otpSender}=require("../../../middlewares/otpSender.js");
const {registerOtpMail}=require("../../../middlewares/registerOtpMail.js");

module.exports.signUpPage=async(req,res,next)=>{
    let colleges=await allCollege.find();
    const collegeData=req.session.CollData || {};
    delete req.session.CollData;
    return res.render("college/collegeSignUp.ejs",{colleges,collegeData});
};

module.exports.signUpUser=async(req,res,next)=>{
    let{collegeName,collegeType,cLocation,password,cPassword}=req.body;
    if(password!=cPassword){
        req.session.CollData={collegeName,collegeType,cLocation};
        req.flash("error","Passwords do not match. Please make sure you enter the same password in both fields.");
        return res.redirect("/Attendance-Tracker/College-SignUp");
    }
    else{
        let findColl=await collegeAccount.findOne({username:collegeName});
        if(findColl){
            req.flash("error","College account already exist. Please Login to your account.");
            return res.redirect("/Attendance-Tracker/College-Login")
        }
        else{
            let totalCollege=await allCollege.findOne({colleges:collegeName});
            let toEmail=totalCollege.email;
            let userName=totalCollege.colleges;
            let subject="Verification code for registration on Attendance Tracker.";
            let genOtp=Math.floor(1000 + Math.random() * 9000);
            let otp=otpSender(toEmail,subject," ",registerOtpMail(userName,genOtp));
            console.log(genOtp);
            let dataArray=[collegeName,collegeType,cLocation,toEmail,password,genOtp];
            req.session.CollData = { collegeName, collegeType, cLocation, toEmail, password };
            return res.render("college/verifyCollegeEmail.ejs",{dataArray});
        }
    }
};