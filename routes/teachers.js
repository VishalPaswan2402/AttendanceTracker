let express=require('express');
const router=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const{teachersSchema}=require("../schema.js");
const expressError=require("../utility/expressError.js");
const Teacher = require('../models/teachers.js');
const newClass = require('../models/class.js');


const validateTeacher=(req,res,next)=>{
    let{error}=teachersSchema.validate(req.body.teachers);
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

router.get("/Teacher-SignUp",(req,res)=>{
    res.render("signup.ejs");
});

// Teacher signup...
router.post("/Teacher-HomePage",validateTeacher,wrapAsync(async(req,res,next)=>{
    let{teacherName,teacherEmail,collegeName,subject,password}=req.body;
    let allTech=await Teacher.find({teacherName:teacherName,teacherEmail:teacherEmail,collegeName:collegeName,subject:subject});
    if(allTech.length>0){
        req.flash("error","You have already created account for same subject...");
        res.redirect("/Attendence-Tracker/Teacher-SignUp");
        // next(new expressError(404,"Teacher already exist with same college and subject. Go back to home page for Log In !"));
    }
    else{
        let newTeacher=new Teacher({teacherName,teacherEmail,collegeName,subject,password});
        await newTeacher.save();
        let id=newTeacher._id;
        let allClass=await newClass.find({teacherId:id});
        req.flash("success","Account created successfully, add your class to manage attendence...");
        res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
    }
}));

// Teacher login...
router.post("/Teacher-HomePages",wrapAsync(async(req,res,next)=>{
    let{teacherName,teacherEmail,password}=req.body;
    let newTeacher=await Teacher.findOne({teacherName:teacherName,teacherEmail:teacherEmail,password:password});
    if(!newTeacher){
        next(new expressError(404,"Teacher Not Found !"));
    }
    else{
        let id=newTeacher._id;
        let allClass=await newClass.find({teacherId:id});
        res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
    }
}));

module.exports=router;