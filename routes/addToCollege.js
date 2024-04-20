let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const collegeReg=require("../models/collegeReg.js");
const collegeT=require("../models/collegeT.js");
const {newCollegeTSchema} = require('../schema.js');

const validateCollegeT=(req,res,next)=>{
    let{error}=newCollegeTSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

router.post("/Add-Teacher",validateCollegeT,wrapAsync(async(req,res)=>{
    let{id}=req.params;
    let{teacherName,gender,idNo}=req.body;
    let findTech=await collegeT.findOne({collegeId:id,idNo:idNo});
    if(!findTech){
        let addTech= new collegeT({collegeId:id,teacherName:teacherName,gender:gender,idNo:idNo});
        await addTech.save();
        req.flash("success","New teacher added successfully.");
        res.redirect(`/Attendence-Tracker/${id}/College-Page`);
    }
    else{
        req.flash("error","Teacher already exist with same ID.");
        res.redirect(`/Attendence-Tracker/${id}/College-Page`);
    }
}));

router.get("/College-Page",wrapAsync(async(req,res,next)=>{
    let{id}=req.params;
    let currCollege=await collegeReg.findById(id);
    let allTeachers=await collegeT.find({collegeId:id});
    res.render("collegePage.ejs",{currCollege,allTeachers});
}));

module.exports=router;