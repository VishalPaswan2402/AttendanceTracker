let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const{teachersSchema}=require("../../../middlewares/schema.js");
const expressError=require("../../../utility/expressError.js");
const Teacher = require('../../../models/teachers.js');
const allCollege=require("../../../models/college.js");
const collegeT = require('../../../models/collegeT.js');
const collegeReg = require('../../../models/collegeReg.js');

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

// Teacher signup page...
router.get("/Teacher-SignUp",async(req,res)=>{
    let colleges=await allCollege.find();
    const formData = req.session.signupFormData || {};
    delete req.session.signupFormData;
    res.render("teacher/teacherSignup.ejs",{colleges,formData});
});

// Teacher signup...
router.post("/Teacher-SignUp",validateTeacher,wrapAsync(async(req,res,next)=>{
    let{username,teacherName,teacherEmail,teacherId,collegeName,subject,password,cPassword}=req.body;
    if(password!=cPassword){
        req.session.signupFormData = { username, teacherName, teacherEmail, teacherId, collegeName, subject };
        req.flash("error","Password does not match.");
        return res.redirect("/Attendence-Tracker/Teacher-SignUp");
    }
    let currCol=await collegeReg.findOne({username:collegeName});
    if(!currCol){
        req.flash("error","College account does not exist.");
        return res.redirect("/Attendence-Tracker/Teacher-SignUp");
    }
    else{
        let collTid=await collegeT.findOne({collegeId:currCol._id,idNo:teacherId});
        if(!collTid){
            req.session.signupFormData = { username, teacherName, teacherEmail, teacherId, collegeName, subject };
            req.flash("error","Your ID does not exist in the college database.");
            return res.redirect("/Attendence-Tracker/Teacher-SignUp");
        }
        else{
            let allTech=await Teacher.findOne({username:username});
            if(allTech){
                req.session.signupFormData = { username, teacherName, teacherEmail, teacherId, collegeName, subject };
                req.flash("error","User with this username already exists.");
                return res.redirect("/Attendence-Tracker/Teacher-SignUp");
            }
            else{
                let newTeacher=new Teacher({username:username,teacherName,teacherId:teacherId,teacherEmail,collegeName,subject:subject.toUpperCase()});
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
        }
    }
}));

module.exports=router;