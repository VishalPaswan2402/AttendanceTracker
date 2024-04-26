let express=require('express');
const router=express.Router();
const wrapAsync=require("../../utility/wrapAsync.js");
const expressError=require("../../utility/expressError.js");
const allCollege=require("../../models/college.js");
const allStudent = require('../../models/students.js');

// Login form...
router.get("/Students-Login",wrapAsync(async(req,res)=>{
    let colleges=await allCollege.find();
    res.render("student/studentLogin.ejs",{colleges});
}));

// Students Page...
router.get("/Students-Page",wrapAsync(async(req,res,next)=>{
    let{sName,sRollNo,semester,section,collegeName}=req.query;
    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
            return match.toUpperCase();
        });
    }
    const originalString = sName;
    const capitalizedString = capitalizeWords(originalString);
    let findStudent=await allStudent.findOne({studentName:capitalizedString,studentRollNo:sRollNo,studentSemester:semester,studentSection:section.toUpperCase(),college:collegeName});
    if(!findStudent){
        next(new expressError(404,"Student Not Found !"));
    }
    else{
        res.render("student/studentPage.ejs",{findStudent});
    }
}));

module.exports=router;