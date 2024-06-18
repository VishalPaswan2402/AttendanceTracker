const expressError=require("../../../utility/expressError.js");
const Attendence = require("../../../models/attendence.js");
const Teacher = require('../../../models/teachers.js');
const allStudent = require('../../../models/students.js');
const newClass = require('../../../models/class.js');

module.exports.printAll=async(req,res,next)=>{
    let{techId,sub,classId}=req.params;
    let currAttend=await Attendence.findOne({classId:classId});
    if(!currAttend){
        req.flash("error","No students have been added to the class yet !");
        return res.redirect(`/Attendance-Tracker/${techId}/${classId}/Attendance-Sheet`);
    }
    else{
        let currClass=await newClass.findById(classId);
        let currTech=await Teacher.findById(techId);
        let totalStudents=await allStudent.find();
        return res.render("attendance/printAttendance.ejs",{totalStudents,currClass,currAttend,classId,techId,currTech});
    }
};

module.exports.printDetained=async(req,res,next)=>{
    let{techId,sub,classId}=req.params;
    let{percentage}=req.query;
    let currAttend=await Attendence.findOne({classId:classId});
    if(!currAttend){
        req.flash("error","No students have been added to the class yet !");
        return res.redirect(`/Attendance-Tracker/${techId}/${classId}/Attendance-Sheet`);
    }
    else{
        let currClass=await newClass.findById(classId);
        let currTech=await Teacher.findById(techId);
        let totalStudents=await allStudent.find();
        return res.render("attendance/printDetained.ejs",{totalStudents,currClass,currAttend,classId,techId,currTech,percentage});
    }
};