let express=require('express');
const app=express();
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const newClass = require('../models/class.js');
const Teacher = require('../models/teachers.js');
const allStudent = require('../models/students.js');
const Attendence = require("../models/attendence.js");
const allCollege=require("../models/college.js");

// Delete Teacher Form...
router.get("/Delete-Account",wrapAsync(async(req,res,next)=>{
    let{techId}=req.params;
    let currTech=await Teacher.findById(techId);
    let colleges=await allCollege.find();
    res.render("deleteAccount.ejs",{colleges,currTech});
}));

// Delete Teacher...
router.delete("/Delete-My-Account",wrapAsync(async(req,res,next)=>{
    let{techId}=req.params;
    let{tName,tEmail,collegeName,tpassword}=req.body;
    let currTech=await Teacher.findById(techId);
    if(currTech.teacherName===tName && currTech.teacherEmail===tEmail && currTech.collegeName===collegeName && currTech.password===tpassword){
        let currClass=await newClass.find({teacherId:techId});
        if(currClass.length>0){
            for(let i=0;i<currClass.length;i++){
                let destAttendence=await Attendence.deleteMany({teacherId:techId,classId:currClass[i]._id.toString()});
                let totStudent=await allStudent.find({studentSemester:currClass[i].semester,studentSection:currClass[i].section,college:currClass[i].college});
                if(totStudent.length>0){
                    for(let j=0;j<totStudent.length;j++){
                        let currAttend=totStudent[j].allAttendence;
                        if(currAttend.length>1){
                            for(let k=0;k<currAttend.length;k++){
                                if(currAttend[k].classId===currClass[i]._id.toString()){
                                    await allStudent.updateOne(
                                        { _id: totStudent[j]._id },
                                        { $pull: { allAttendence: { classId: currClass[i]._id } } }
                                    );
                                }
                            }
                        }
                        else{
                            let destroyStudents=await allStudent.deleteMany({studentSemester:currClass[i].semester,studentSection:currClass[i].section,college:currClass[i].college});
                        }
                    }
                }
            }
        }
        let destroyClass=await newClass.deleteMany({teacherId:techId});
        let destroyTeacher=await Teacher.findByIdAndDelete(techId);
        req.flash("success","Your account has been deleted successfully.");
        res.redirect("/");
    }
    else{
        req.flash("error","Please enter all data correctly to delete your account.");
        res.redirect(`/Attendence-Tracker/${techId}/Delete-Account`);
    }
}));

module.exports=router;