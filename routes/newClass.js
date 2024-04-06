let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const{newClassSchema}=require("../schema.js");
const Teacher = require('../models/teachers.js');
const newClass = require('../models/class.js');
const allStudent = require('../models/students.js');
const Attendence = require("../models/attendence.js");

// Validate Class...
const validatenewClass=(req,res,next)=>{
    let{error}=newClassSchema.validate(req.body.newClass);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

// To add new class...
router.post("/New-Class",validatenewClass,wrapAsync(async(req,res,next)=>{
    let{id}=req.params;
    let{semester,section,password}=req.body;
    let newTeacher=await Teacher.findById(id);
    if(newTeacher.password===password){
        let teacherId=newTeacher._id;
        let college=newTeacher.collegeName;
        let oriPass=newTeacher.password;
        let subject=newTeacher.subject;
        let findClass=await newClass.find({semester:semester,section:section,subject:subject,college:college});
        if(findClass.length<1){
            let addClass=new newClass({teacherId,semester,section,subject,college});
            await addClass.save();
            let classId=addClass._id;
            let totalStudent=await allStudent.find({studentSemester:semester,studentSection:section,college:college});
            if (totalStudent.length > 0) {
                for (let i = 0; i < totalStudent.length; i++) {
                    let newAttendance = new Attendence({subject:subject, teacherId: teacherId, classId: classId, studentId: totalStudent[i]._id });
                    await newAttendance.save();
                    totalStudent[i].allAttendence.push(newAttendance);
                    await totalStudent[i].save();
                }
            }
            res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
        }
        else{
            next(new expressError(400,"This class already exist..."));
        }
        
    }
    else{
        next(new expressError(400,"Incorrect password go back and try again..."));
    }
}));

// For teacher homepage...
router.get("/TeacherHome",wrapAsync(async(req,res,next)=>{
    let{id}=req.params;
    if(id){
        let newTeacher=await Teacher.findById(id);
        let allClass=await newClass.find({teacherId:newTeacher._id});
        res.render("teacherHome.ejs",{newTeacher,allClass});
    }
}));

module.exports=router;