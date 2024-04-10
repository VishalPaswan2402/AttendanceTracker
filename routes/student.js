let express=require('express');
const router=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const allCollege=require("../models/college.js");
const allStudent = require('../models/students.js');

router.get("/Students-Login",async(req,res)=>{
    let colleges=await allCollege.find();
    // console.log(colleges);
    res.render("login.ejs",{colleges});
});

// Students Page...
router.get("/Students-Page",wrapAsync(async(req,res,next)=>{
    let{sName,sRollNo,semester,section,collegeName}=req.query;
    let findStudent=await allStudent.findOne({studentName:sName,studentRollNo:sRollNo,studentSemester:semester,studentSection:section,college:collegeName});
    if(!findStudent){
        next(new expressError(404,"Student Not Found !"));
    }
    else{
        res.render("stPage.ejs",{findStudent});
    }
    
}));

module.exports=router;