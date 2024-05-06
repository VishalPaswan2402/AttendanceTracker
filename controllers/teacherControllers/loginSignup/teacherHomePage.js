const expressError=require("../../../utility/expressError.js");
const collegeTeacher=require("../../../models/collegeTeacher.js");
const Teacher = require('../../../models/teachers.js');
const newClass = require('../../../models/class.js');

module.exports.teacherHomePage=async(req,res,next)=>{
    let{id}=req.params;
    if(id){
        let newTeacher=await Teacher.findById(id);
        let techerGender=await collegeTeacher.findOne({idNo:newTeacher.teacherId});
        let gender=techerGender.gender;
        let allClass=await newClass.find({teacherId:newTeacher._id});
        return res.render("teacher/teacherHome.ejs",{newTeacher,allClass,gender});
    }
};