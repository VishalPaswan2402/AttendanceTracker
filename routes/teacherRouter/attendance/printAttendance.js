let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const Attendence = require("../../../models/attendence.js");
const Teacher = require('../../../models/teachers.js');
const allStudent = require('../../../models/students.js');
const newClass = require('../../../models/class.js');
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");

// To print attendence sheet of all students...
router.get("/Print-All-Attendence-sheet",isTeacLoggedIn,isOwner,wrapAsync(async(req,res,next)=>{
    let{techId,sub,classId}=req.params;
    let currAttend=await Attendence.findOne({classId:classId});
    if(!currAttend){
        req.flash("error","No students have been added to the class yet !");
        res.redirect(`/Attendence-Tracker/${techId}/${classId}/Attendence-Sheet`);
    }
    else{
        let currClass=await newClass.findById(classId);
        let currTech=await Teacher.findById(techId);
        let totalStudents=await allStudent.find();
        res.render("attendance/printAttendence.ejs",{totalStudents,currClass,currAttend,classId,techId,currTech});
    }
}));

// To print attendence sheet of detained students...
router.get("/Print-Detained-Attendence-sheet",isTeacLoggedIn,isOwner,wrapAsync(async(req,res,next)=>{
    let{techId,sub,classId}=req.params;
    let currAttend=await Attendence.findOne({classId:classId});
    if(!currAttend){
        req.flash("error","No students have been added to the class yet !");
        res.redirect(`/Attendence-Tracker/${techId}/${classId}/Attendence-Sheet`);
    }
    else{
        let currClass=await newClass.findById(classId);
        let currTech=await Teacher.findById(techId);
        let totalStudents=await allStudent.find();
        res.render("attendance/printDetained.ejs",{totalStudents,currClass,currAttend,classId,techId,currTech});
    }
}));

module.exports=router;