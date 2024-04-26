let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const collegeTeacher=require("../../../models/collegeTeacher.js");

// Edit college teacher form...
router.get("/Edit-Teacher",wrapAsync(async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let tecData=await collegeTeacher.findOne({collegeId:collId,_id:tecId});
    res.render("editCollege/editCollegeTeacher.ejs",{collId,tecId,tecData});
}));

// Edit college teacher...
router.put("/Edit-Teacher-Data",wrapAsync(async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let{tName,tGender,tId}=req.body;
    let techerId=await collegeTeacher.findOne({idNo:tId});
    if(!techerId){
        let curTeac=await collegeTeacher.findByIdAndUpdate(tecId,{teacherName:tName,gender:tGender,idNo:tId});
        req.flash("success","Teacher data updated successfully.");
        res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
    }
    else{
        let curTeac=await collegeTeacher.findByIdAndUpdate(tecId,{teacherName:tName,gender:tGender});
        req.flash("success","Teacher's data updated except ID.");
        res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
    }
}));

// Delete college teacher...
router.delete("/collegeTeacher-Destroy",wrapAsync(async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let destroyTeacher=await collegeTeacher.findByIdAndDelete(tecId);
    req.flash("success","Teacher's data deleted successfully.");
    res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
}));

module.exports=router;