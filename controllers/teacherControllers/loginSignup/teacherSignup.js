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
    return res.render("teacher/teacherSignup.ejs",{colleges,formData});
};

module.exports.saveTeacherData=async(req,res,next)=>{
    let{username,teacherName,teacherEmail,teacherId,collegeName,subject,password,cPassword}=req.body;
    let subject1=subject.toUpperCase();
    if(password!=cPassword){
        req.session.signupFormData = { username, teacherName, teacherEmail, teacherId, collegeName, subject1 };
        req.flash("error","Passwords do not match. Please make sure you enter the same password in both fields.");
        return res.redirect("/Attendance-Tracker/Teacher-SignUp");
    }
    let currCol=await collegeAccount.findOne({username:collegeName});
    if(!currCol){
        req.flash("error","College account does not exist.");
        return res.redirect("/Attendance-Tracker/Teacher-SignUp");
    }
    else{
        let collTid=await collegeTeacher.findOne({collegeId:currCol._id,idNo:teacherId});
        if(!collTid){
            req.session.signupFormData = { username, teacherName, teacherEmail, teacherId, collegeName, subject1 };
            req.flash("error","Your ID was not found in the college database. Please ask your college registrar to add it");
            return res.redirect("/Attendance-Tracker/Teacher-SignUp");
        }
        else{
            let allTech=await Teacher.findOne({username:username});
            if(allTech){
                req.session.signupFormData = { username, teacherName, teacherEmail, teacherId, collegeName, subject };
                req.flash("error","A user with this username already exists. Please try with another username.");
                return res.redirect("/Attendance-Tracker/Teacher-SignUp");
            }
            else{
                let sameSubject= await Teacher.findOne({teacherId:teacherId,collegeName:currCol.username,subject:subject1});
                if(sameSubject){
                    req.flash("error","You already have an existing account for this subject. Please login here.");
                    return res.redirect("/Attendance-Tracker/Teacher-Login");
                }
                else{
                    let subject="Verification code for registration on Attendance Tracker.";
                    let genOtp=Math.floor(1000 + Math.random() * 9000);
                    let otp=otpSender(teacherEmail,subject," ",registerOtpMail(teacherName,genOtp));
                    console.log(genOtp);
                    let dataArray=[username,teacherName,teacherId,teacherEmail,collegeName,subject1,password,genOtp];
                    req.session.TechData = { username,teacherName,teacherId,teacherEmail,collegeName,subject1,password };
                    return res.render("teacher/verifyTeacherEmail.ejs",{dataArray});
                }
            }
        }
    }
};