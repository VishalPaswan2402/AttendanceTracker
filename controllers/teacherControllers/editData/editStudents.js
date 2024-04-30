const allStudent = require('../../../models/students.js');
const Attendence = require("../../../models/attendence.js");
const expressError=require("../../../utility/expressError.js");

module.exports.editStudentForm=async(req,res,next)=>{
    let{stId,techId,classId}=req.params;
    let findStudent=await allStudent.findById(stId);
    res.render("student/studentEdit.ejs",{findStudent,techId,classId});
};

module.exports.editStudentData=async(req,res,next)=>{
    let{techId,classId,stId}=req.params;
    let{sName,sRollNo}=req.body;
    let stEdit=await allStudent.findByIdAndUpdate(stId,({studentName:sName,studentRollNo:sRollNo}));
    req.flash("success","Student data edited successfully.");
    res.redirect(`/Attendence-Tracker/${techId}/${classId}/Attendence-Sheet`);
};

module.exports.destroyStudents=async(req,res)=>{
    let{techId,classId,stId}=req.params;
    let destroyStudent=await allStudent.findByIdAndDelete(stId);
    let destAtt=await Attendence.deleteMany({studentId:stId});
    req.flash("success","Student data deleted successfully.");
    res.redirect(`/Attendence-Tracker/${techId}/${classId}/Attendence-Sheet`);
};