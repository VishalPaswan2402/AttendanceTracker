let express=require('express');
const router=express.Router();
const bcrypt=require("bcrypt");
const wrapAsync=require("../utility/wrapAsync.js");
const passport=require("passport");
const{teachersSchema}=require("../schema.js");
const expressError=require("../utility/expressError.js");
const Teacher = require('../models/teachers.js');
const allCollege=require("../models/college.js");
const newClass = require('../models/class.js');

const validateTeacher=(req,res,next)=>{
    let{error}=teachersSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

router.get("/Teacher-Login",(req,res)=>{
    res.render("tlogin.ejs");
});

router.get("/Teacher-SignUp",async(req,res)=>{
    let colleges=await allCollege.find();
    const formData = req.session.signupFormData || {};
    delete req.session.signupFormData;
    res.render("signup.ejs",{colleges,formData});
});

// Teacher signup...
router.post("/Teacher-HomePage",validateTeacher,wrapAsync(async(req,res,next)=>{
    let{username,teacherName,teacherEmail,collegeName,subject,password,cPassword}=req.body;
    if(password!=cPassword){
        req.session.signupFormData = { username, teacherName, teacherEmail, collegeName, subject };
        req.flash("error","Password not match.");
        return res.redirect("/Attendence-Tracker/Teacher-SignUp");
    }
    else{
        let allTech=await Teacher.find({username:username});
        if(allTech.length>0){
            req.session.signupFormData = { username, teacherName, teacherEmail, collegeName, subject };
            req.flash("error","User with this username already exists.");
            return res.redirect("/Attendence-Tracker/Teacher-SignUp");
        }
        else{
            let hashed=await bcrypt.hash(password,13);
            let newTeacher=new Teacher({username,teacherName,teacherEmail,collegeName,subject,password:hashed});
            await newTeacher.save();
            let id=newTeacher._id;
            req.flash("success","Account created successfully ! Add your class to manage attendance.");
            res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
        }
    }
}));

// Teacher's login...
router.post("/Teacher-HomePages",async(req,res,next)=>{
    let{username,password}=req.body;
    let currTeacher=await Teacher.findOne({username:username});
    if(!currTeacher){
        req.flash("error","Username does not exist.");
        res.redirect("/Attendence-Tracker/Teacher-Login");
    }
    else{
        let resulted=await bcrypt.compare(password,currTeacher.password);
        if(resulted===false){
            req.flash("error","Password is not correct.");
            res.redirect("/Attendence-Tracker/Teacher-Login");
        }
        else{
            let id=currTeacher._id;
            res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
        }
    }
})

module.exports=router;