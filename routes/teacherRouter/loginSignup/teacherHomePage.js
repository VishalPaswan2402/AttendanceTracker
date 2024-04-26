let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const collegeTeacher=require("../../../models/collegeT.js");
const Teacher = require('../../../models/teachers.js');
const newClass = require('../../../models/class.js');

// For teacher homepage...
router.get("/TeacherHome",wrapAsync(async(req,res,next)=>{
    let{id}=req.params;
    if(id){
        let newTeacher=await Teacher.findById(id);
        let techerGender=await collegeTeacher.findOne({idNo:newTeacher.teacherId});
        let gender=techerGender.gender;
        let allClass=await newClass.find({teacherId:newTeacher._id});
        res.render("teacher/teacherHome.ejs",{newTeacher,allClass,gender});
    }
}));

module.exports=router;