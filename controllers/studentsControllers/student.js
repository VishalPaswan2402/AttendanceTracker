const wrapAsync=require("../../utility/wrapAsync.js");
const expressError=require("../../utility/expressError.js");
const allCollege=require("../../models/college.js");
const allStudent = require('../../models/students.js');

module.exports.loginPage=async(req,res)=>{
    let colleges=await allCollege.find();
    return res.render("student/studentLogin.ejs",{colleges});
};

module.exports.studentPage=async(req,res,next)=>{
    let{sName,sRollNo,semester,section,collegeName}=req.query;
    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
            return match.toUpperCase();
        });
    }
    const originalString = sName;
    const capitalizedString = capitalizeWords(originalString);
    let findStudent=await allStudent.findOne({studentName:capitalizedString,studentRollNo:sRollNo.toUpperCase(),studentSemester:semester,studentSection:section.toUpperCase(),college:collegeName});
    if(!findStudent){
        return next(new expressError(404,"Student Not Found !"));
    }
    else{
        return res.render("student/studentPage.ejs",{findStudent});
    }
};