let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const passport=require("passport");
const newClass = require('../../../models/class.js');
const Teacher = require('../../../models/teachers.js');
const allStudent = require('../../../models/students.js');
const Attendence = require("../../../models/attendence.js");
const allCollege=require("../../../models/college.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");

// Delete Teacher Form...
router.get("/Delete-Account",isTeacLoggedIn,wrapAsync(async(req,res,next)=>{
    let{techId}=req.params;
    let currTech=await Teacher.findById(techId);
    let colleges=await allCollege.find();
    res.render("editTeacher/deleteTeacherAccount.ejs",{colleges,currTech});
}));

// Delete Teacher...
router.delete("/Delete-My-Account",isTeacLoggedIn,isOwner,passport.authenticate('teacher',{failureRedirect: `back`,failureFlash:true}),wrapAsync(async(req,res,next)=>{
    let{techId}=req.params;
    let{username,tName,tEmail,collegeName,password}=req.body;
    let{user}=req;
    if(user.username===username && user.teacherName===tName && user.teacherEmail===tEmail && user.collegeName===collegeName){
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