const expressError=require("../../../utility/expressError.js");
const collegeAccount=require("../../../models/collegeAccount.js");
const collegeTeacher=require("../../../models/collegeTeacher.js");

module.exports.searchTeacher=async(req,res,next)=>{
    let{teacherName}=req.query;
    let{id}=req.params;
    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
            return match.toUpperCase();
        });
    }
    const originalString = teacherName;
    const capitalizedString = capitalizeWords(originalString);
    let currCollege=await collegeAccount.findById(id);
    let allTeachers=await collegeTeacher.find({teacherName:capitalizedString,collegeName:currCollege.username});
    let searching="True";
    return res.render("college/collegePage.ejs",{currCollege,allTeachers,searching,teacherName});
};