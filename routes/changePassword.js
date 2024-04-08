let express=require('express');
const app=express();
const router=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const Teacher = require('../models/teachers.js');

router.get("/Restore-Password",(req,res)=>{
    res.render("forgetPass.ejs");
});

// To change Password Page...
router.post("/Restore-Password",wrapAsync(async(req,res,next)=>{
    let{tName,tEmail,college,subject}=req.body;
    let findTech=await Teacher.findOne({teacherName:tName,teacherEmail:tEmail,collegeName:college,subject:subject});
    if(!findTech){
        next(new expressError(404,"Teacher Not Found !"));
    }
    else{
        res.render("changePass.ejs",{findTech});
    }
}));

//Changed password...
router.put("/:id/Change-Password",async(req,res,next)=>{
    let{id}=req.params;
    let{newpassword,confPass}=req.body;
    let currTech=await Teacher.findByIdAndUpdate(id,{password:newpassword});
    req.flash("success","Password changed successfully, you can login with new password...");
    res.redirect("/Attendence-Tracker/Teacher-Login");
});

module.exports=router;