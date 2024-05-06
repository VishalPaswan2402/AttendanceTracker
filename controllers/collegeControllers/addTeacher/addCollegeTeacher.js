const expressError=require("../../../utility/expressError.js");
const collegeAccount=require("../../../models/collegeAccount.js");
const collegeTeacher=require("../../../models/collegeTeacher.js");

module.exports.addCollegeTeacher=async(req,res)=>{
    let{id}=req.params;
    let{teacherName,gender,idNo}=req.body;
    let currColl=await collegeAccount.findById(id);
    let findTech=await collegeTeacher.findOne({collegeId:id,idNo:idNo});
    if(!findTech){
        let addTech= new collegeTeacher({collegeId:id,teacherName:teacherName,gender:gender,idNo:idNo,collegeName:currColl.username});
        await addTech.save();
        req.flash("success","New teacher added successfully.");
        return res.redirect(`/Attendence-Tracker/${id}/College-Page`);
    }
    else{
        req.flash("error","Teacher already exist with same ID.");
        return res.redirect(`/Attendence-Tracker/${id}/College-Page`);
    }
};

module.exports.teacherHomePage=async(req,res,next)=>{
    let{id}=req.params;
    let currCollege=await collegeAccount.findById(id);
    let allTeachers=await collegeTeacher.find({collegeId:id});
    let=teacherName=0;
    let searching="False";
    return res.render("college/collegePage.ejs",{currCollege,allTeachers,searching,teacherName});
};