const expressError=require("../../../utility/expressError.js");
const collegeAccount=require("../../../models/collegeAccount.js");
const collegeTeacher=require("../../../models/collegeTeacher.js");

module.exports.searchTeacher=async(req,res,next)=>{
    let{teacherName}=req.query;
    let{id}=req.params;
    let currCollege=await collegeAccount.findById(id);
    let allTeachers=await collegeTeacher.find({teacherName:teacherName});
    let searching="True";
    res.render("college/collegePage.ejs",{currCollege,allTeachers,searching,teacherName});
};