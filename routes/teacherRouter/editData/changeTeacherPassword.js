let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const Teacher = require('../../../models/teachers.js');
const allCollege=require("../../../models/college.js");

// Forget password form...
router.get("/Forgot-Teacher-Password",wrapAsync(async(req,res,next)=>{
    let colleges=await allCollege.find();
    res.render("editTeacher/forgetTeacherPassword.ejs",{colleges});
}));

// Find forget password data...
router.get("/Restore-Teacher-Password",wrapAsync(async(req,res,next)=>{
    let{username,tName,tEmail,college}=req.query;
    let findTech=await Teacher.findOne({username:username,teacherName:tName,teacherEmail:tEmail,collegeName:college});
    if(!findTech){
        next(new expressError(404,"Teacher Not Found !"));
    }
    else{
        res.render("editTeacher/changeTeacherPassword.ejs",{findTech});
    }
}));

// Update new password...
router.put("/:id/Change-Teacher-Password",wrapAsync(async(req,res,next)=>{
    let{id}=req.params;
    let currTech=await Teacher.findById(id);
    let{password,passwordConf}=req.body;
    if(password===passwordConf){
        await currTech.setPassword(password);
        await currTech.save();
        req.flash("success","Password changed successfully. You can now log in with your new password.");
        res.redirect("/Attendence-Tracker/Teacher-Login");
    }
    else{
        req.flash("error","Password not match. Please enter it again.");
        res.redirect("back")
    }
}));

module.exports=router;