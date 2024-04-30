const expressError=require("../../../utility/expressError.js");
const collegeTeacher=require("../../../models/collegeTeacher.js");

module.exports.editTeacherPage=async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let tecData=await collegeTeacher.findOne({collegeId:collId,_id:tecId});
    res.render("editCollege/editCollegeTeacher.ejs",{collId,tecId,tecData});
};

module.exports.editTeacherForm=async(req,res,next)=>{
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
};

module.exports.destroyTeacher=async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let destroyTeacher=await collegeTeacher.findByIdAndDelete(tecId);
    req.flash("success","Teacher's data deleted successfully.");
    res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
};