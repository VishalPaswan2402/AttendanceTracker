let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const allCollege=require("../../../models/college.js");
const collegeAccount=require("../../../models/collegeAccount.js");
const {collegeAccountSchema} = require('../../../middlewares/schema.js');
const {otpSender}=require("../../../middlewares/otpSender.js");
const {registerOtpMail}=require("../../../middlewares/registerOtpMail.js");

const validateCollege=(req,res,next)=>{
    let{error}=collegeAccountSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

// College Signup Page...
router.get("/College-SignUp",wrapAsync(async(req,res,next)=>{
    let colleges=await allCollege.find();
    const collegeData=req.session.CollData || {};
    delete req.session.CollData;
    res.render("college/collegeSignUp.ejs",{colleges,collegeData});
}));

// College SignUp...
router.post("/College-SignPage",validateCollege,wrapAsync(async(req,res,next)=>{
    let{collegeName,collegeType,cLocation,password,cPassword}=req.body;
    if(password!=cPassword){
        req.session.CollData={collegeName,collegeType,cLocation};
        req.flash("error","Passwords do not match. Please make sure you enter the same password in both fields.");
        res.redirect("/Attendence-Tracker/College-SignUp");
    }
    else{
        let findColl=await collegeAccount.findOne({username:collegeName});
        if(findColl){
            req.flash("error","College account already exist. Please Login to your account.");
            res.redirect("/Attendence-Tracker/College-Login")
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
            res.render("college/verifyCollegeEmail.ejs",{dataArray});
        }
    }
}));

module.exports=router;