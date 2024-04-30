const expressError=require("../../../utility/expressError.js");
const Teacher = require('../../../models/teachers.js');
const allCollege=require("../../../models/college.js");
const collegeTeacher = require('../../../models/collegeTeacher.js');
const collegeAccount = require('../../../models/collegeAccount.js');
const {otpSender}=require("../../../middlewares/otpSender.js");
const {registerOtpMail}=require("../../../middlewares/registerOtpMail.js");

module.exports.sigupForm=async(req,res)=>{
    let colleges=await allCollege.find();
    const formData = req.session.signupFormData || {};
    delete req.session.signupFormData;
    res.render("teacher/teacherSignup.ejs",{colleges,formData});
};

module.exports.saveTeacherData=async(req,res,next)=>{
    let{username,teacherName,teacherEmail,teacherId,collegeName,subject,password,cPassword}=req.body;
    let subject1=subject;
    if(password!=cPassword){
        req.session.signupFormData = { username, teacherName, teacherEmail, teacherId, collegeName, subject };
        req.flash("error","Passwords do not match. Please make sure you enter the same password in both fields.");
        return res.redirect("/Attendence-Tracker/Teacher-SignUp");
    }
    let currCol=await collegeAccount.findOne({username:collegeName});
    if(!currCol){
        req.flash("error","College account does not exist.");
        return res.redirect("/Attendence-Tracker/Teacher-SignUp");
    }
    else{
        let collTid=await collegeTeacher.findOne({collegeId:currCol._id,idNo:teacherId});
        if(!collTid){
            req.session.signupFormData = { username, teacherName, teacherEmail, teacherId, collegeName, subject };
            req.flash("error","Your ID does not exist in the college database.");
            return res.redirect("/Attendence-Tracker/Teacher-SignUp");
        }
        else{
            let allTech=await Teacher.findOne({username:username});
            if(allTech){
                req.session.signupFormData = { username, teacherName, teacherEmail, teacherId, collegeName, subject };
                req.flash("error","A user with this username already exists. Please try another username.");
                return res.redirect("/Attendence-Tracker/Teacher-SignUp");
            }
            else{
                let subject="Verification code for registration on Attendance Tracker.";
                let genOtp=Math.floor(1000 + Math.random() * 9000);
                let otp=otpSender(teacherEmail,subject," ",registerOtpMail(teacherName,genOtp));
                console.log(genOtp);
                let dataArray=[username,teacherName,teacherId,teacherEmail,collegeName,subject1,password,genOtp];
                req.session.TechData = { username,teacherName,teacherId,teacherEmail,collegeName,subject1,password };
                res.render("teacher/verifyTeacherEmail.ejs",{dataArray});
            }
        }
    }
};