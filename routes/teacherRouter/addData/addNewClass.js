let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const{newClassSchema}=require("../../../middlewares/schema.js");
const collegeTeacher=require("../../../models/collegeT.js");
const Teacher = require('../../../models/teachers.js');
const newClass = require('../../../models/class.js');
const allStudent = require('../../../models/students.js');
const Attendence = require("../../../models/attendence.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");

// Validate Class...
const validatenewClass=(req,res,next)=>{
    let{error}=newClassSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

// To add new class...
router.post("/New-Class",isTeacLoggedIn,isOwner,validatenewClass,wrapAsync(async(req,res,next)=>{
    let{id}=req.params;
    let{semester,section}=req.body;
    let newTeacher=await Teacher.findById(id);
    let teacherId=newTeacher._id;
    let college=newTeacher.collegeName;
    let subject=newTeacher.subject;
    let findClass=await newClass.find({semester:semester,section:section.toUpperCase(),subject:subject,college:college});
    if(findClass.length<1){
        let addClass=new newClass({teacherId,semester,section:section.toUpperCase(),subject,college});
        await addClass.save();
        let classId=addClass._id;
        let totalStudent=await allStudent.find({studentSemester:semester,studentSection:section.toUpperCase(),college:college});
        if (totalStudent.length > 0) {
            for (let i = 0; i < totalStudent.length; i++) {
                let newAttendance = new Attendence({subject:subject, teacherId: teacherId, classId: classId, studentId: totalStudent[i]._id });
                await newAttendance.save();
                totalStudent[i].allAttendence.push(newAttendance);
                await totalStudent[i].save();
            }
        }
        req.flash("success","New class added successfully.");
        res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
    }
    else{
        req.flash("error","A teacher already exists for this class and subject.");
        res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
    }
}));

module.exports=router;