let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const collegeReg=require("../models/collegeReg.js");
const collegeT=require("../models/collegeT.js");
const {newCollegeTSchema} = require('../schema.js');

router.get("/Edit-Teacher",wrapAsync(async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let tecData=await collegeT.findOne({collegeId:collId,_id:tecId});
    res.render("editCollT.ejs",{collId,tecId,tecData});
}));

router.put("/Edit-Teacher-Data",wrapAsync(async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let{tName,tGender,tId}=req.body;
    let techerId=await collegeT.findOne({idNo:tId});
    if(!techerId){
        let curTeac=await collegeT.findByIdAndUpdate(tecId,{teacherName:tName,gender:tGender,idNo:tId});
        req.flash("success","Teacher data updated successfully.");
        res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
    }
    else{
        let curTeac=await collegeT.findByIdAndUpdate(tecId,{teacherName:tName,gender:tGender});
        req.flash("success","Teacher's data updated except ID.");
        res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
    }
}));

router.delete("/collegeTeacher-Destroy",wrapAsync(async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let destroyTeacher=await collegeT.findByIdAndDelete(tecId);
    req.flash("success","Teacher's data deleted successfully.");
    res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
}));

module.exports=router;