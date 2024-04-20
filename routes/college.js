let express=require('express');
const router=express.Router();
const bcrypt=require("bcrypt");
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const allCollege=require("../models/college.js");
const collegeReg=require("../models/collegeReg.js");
const collegeT=require("../models/collegeT.js");
const { newCollegeSchema,newCollegeTSchema } = require('../schema.js');

const validateCollege=(req,res,next)=>{
    let{error}=newCollegeSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

router.get("/College-Login",wrapAsync(async(req,res,next)=>{
    let colleges=await allCollege.find();
    res.render("collegeLogin.ejs",{colleges});
}));

router.get("/College-SignUp",wrapAsync(async(req,res,next)=>{
    let colleges=await allCollege.find();
    const collegeData=req.session.CollData || {};
    delete req.session.CollData;
    res.render("collegeSignUp.ejs",{colleges,collegeData});
}));

router.post("/College-Login",wrapAsync(async(req,res,next)=>{
    let{collegeName,cEmail,password}=req.body;
    let currCollege=await collegeReg.findOne({collegeName:collegeName,eMail:cEmail});
    if(!currCollege){
        req.flash("error","College account does not exist. Please go to signup page to create an account.");
        res.redirect("/Attendence-Tracker/College-Login");
    }
    else{
        let hasPass=await bcrypt.compare(password,currCollege.password);
        if(hasPass===false){
            req.flash("error","Password is incorrect.");
            res.redirect("/Attendence-Tracker/College-Login");
        }
        else{
            let id=currCollege._id;
            res.redirect(`/Attendence-Tracker/${id}/College-Page`);
        }
    }
}));

router.post("/College-SignPage",validateCollege,wrapAsync(async(req,res,next)=>{
    let{collegeName,collegeType,cLocation,eMail,password,cPassword}=req.body;
    if(password!=cPassword){
        req.session.CollData={collegeName,collegeType,cLocation,eMail};
        req.flash("error","Password not match.");
        res.redirect("/Attendence-Tracker/College-SignUp");
    }
    else{
        let findColl=await collegeReg.findOne({collegeName:collegeName});
        if(findColl){
            req.flash("error","Account already exist. Please Login to your account.");
            res.redirect("/Attendence-Tracker/College-Login")
        }
        else{
            let hashPass=await bcrypt.hash(password,13);
            let newCollege=new collegeReg({collegeName:collegeName,collegeType:collegeType,location:cLocation,eMail:eMail,password:hashPass});
            await newCollege.save();
            let id=newCollege._id;
            req.flash("success","Account is created successfully.")
            res.redirect(`/Attendence-Tracker/${id}/College-Page`);
        }
    }
}));

module.exports=router;