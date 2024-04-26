let express=require('express');
const router=express.Router();
const wrapAsync = require('../../../utility/wrapAsync.js');
const expressError=require("../../../utility/expressError.js");
const allCollege=require("../../../models/college.js");
const collegeReg=require("../../../models/collegeReg.js");

// Forget password page...
router.get("/Forget-college-Password",wrapAsync(async(req,res,next)=>{
    let colleges=await allCollege.find();
    res.render("editCollege/forgetCollegePassword.ejs",{colleges});
}));

// Find forget account data...
router.get("/Restore-College-Password",wrapAsync(async(req,res,next)=>{
    let{college,collegeType,cEmail}=req.query;
    console.log(college,collegeType,cEmail);
    let currCollege=await collegeReg.findOne({username:college,collegeType:collegeType,eMail:cEmail});
    console.log(currCollege);
    if(!currCollege){
        next(new expressError(404,"College Not Found !"));
    }
    else{
        res.render("editCollege/changeCollegePassword.ejs",{currCollege});
    }
}));

// Update new password...
router.put("/:id/Change-College-Password",wrapAsync(async(req,res,next)=>{
    let{id}=req.params;
    let currCollege=await collegeReg.findById(id);
    let{password,passwordConf}=req.body;
    if(password===passwordConf){
        await currCollege.setPassword(password);
        await currCollege.save();
        req.flash("success","Password changed successfully. You can now log in with your new password.");
        res.redirect("/Attendence-Tracker/College-Login");
    }
    else{
        req.flash("error","Password not match. Please enter it again.");
        res.redirect("back");
    }
}));

module.exports=router;