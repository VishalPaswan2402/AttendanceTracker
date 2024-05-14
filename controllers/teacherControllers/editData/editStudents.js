const allStudent = require('../../../models/students.js');
const Attendence = require("../../../models/attendence.js");
const expressError=require("../../../utility/expressError.js");

module.exports.editStudentForm=async(req,res,next)=>{
    let{stId,techId,classId}=req.params;
    let findStudent=await allStudent.findById(stId);
    return res.render("student/studentEdit.ejs",{findStudent,techId,classId});
};

module.exports.editStudentData=async(req,res,next)=>{
    let{techId,classId,stId}=req.params;
    let{sName,sRollNo}=req.body;
    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
            return match.toUpperCase();
        });
    }
    const originalString = sName;
    const capitalizedString = capitalizeWords(originalString);
    let stEdit=await allStudent.findByIdAndUpdate(stId,({studentName:capitalizedString,studentRollNo:sRollNo.toUpperCase()}));
    req.flash("success","Student data updated successfully.");
    return res.redirect(`/Attendence-Tracker/${techId}/${classId}/Attendence-Sheet`);
};

module.exports.destroyStudents=async(req,res)=>{
    let{techId,classId,stId}=req.params;
    let destroyStudent=await allStudent.findByIdAndDelete(stId);
    let destAtt=await Attendence.deleteMany({studentId:stId});
    req.flash("success","Student data deleted successfully.");
    return res.redirect(`/Attendence-Tracker/${techId}/${classId}/Attendence-Sheet`);
};