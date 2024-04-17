let express=require('express');
const router=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const bcrypt = require('bcrypt');
const passport=require("passport");
const Teacher = require('../models/teachers.js');
const allCollege=require("../models/college.js");

router.get("/Restore-Password",wrapAsync(async(req,res,next)=>{
    let colleges=await allCollege.find();
    res.render("forgetPass.ejs",{colleges});
}));

// To change Password Page...
router.post("/Restore-Password",wrapAsync(async(req,res,next)=>{
    let{username,tName,tEmail,college}=req.body;
    let findTech=await Teacher.findOne({username:username,teacherName:tName,teacherEmail:tEmail,collegeName:college});
    if(!findTech){
        next(new expressError(404,"Teacher Not Found !"));
    }
    else{
        res.render("changePass.ejs",{findTech});
    }
}));

//Changed password...
router.put("/:id/Change-Password",wrapAsync(async(req,res,next)=>{
    let{id}=req.params;
    let{password}=req.body;
    const newPassword = await bcrypt.hash(password,13);
    await Teacher.findByIdAndUpdate(id, {password:newPassword});
    req.flash("success","Password changed successfully. You can now log in with the new password.");
    res.redirect("/Attendence-Tracker/Teacher-Login");
}));

module.exports=router;