const allStudent = require('../../../models/students.js');
const Attendence = require("../../../models/attendence.js");
const expressError=require("../../../utility/expressError.js");

module.exports.editStudentForm=async(req,res,next)=>{
    let{stId,techId,classId}=req.params;
    let findStudent=await allStudent.findById(stId);
    let attends=await Attendence.findOne({teacherId:techId,classId:classId,studentId:stId});
    let prevAttend=attends.classPrevious;
    return res.render("student/studentEdit.ejs",{findStudent,techId,classId,prevAttend});
};

module.exports.editStudentData=async(req,res,next)=>{
    let{techId,classId,stId}=req.params;
    let{sName,sRollNo,currAttend}=req.body;
    let attends=await Attendence.findOne({teacherId:techId,classId:classId,studentId:stId});
    let studentAttendId=attends._id;
    let prevAttend=attends.classPrevious;

    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
            return match.toUpperCase();
        });
    }
    const originalString = sName;
    const capitalizedString = capitalizeWords(originalString);

    let currStudent=await allStudent.findById(stId);
    
    if(currStudent.studentRollNo!=sRollNo){
        let newRoll=await allStudent.findOne({studentRollNo:sRollNo,studentSemester:currStudent.studentSemester,studentSection:currStudent.studentSection,college:currStudent.college});
        if(newRoll){
            req.flash("error","Student already exist with same roll number.");
            return res.redirect(`/Attendence-Tracker/${techId}/${classId}/Attendence-Sheet`);
        }
        else{
            let stEdit=await allStudent.findByIdAndUpdate(stId,({studentName:capitalizedString,studentRollNo:sRollNo.toUpperCase()}));
        }
    }
    else{
        let stEdit=await allStudent.findByIdAndUpdate(stId,({studentName:capitalizedString}));
    }
    if(prevAttend==="Absent"){
        if(currAttend==="Present"){
            let attendClass=attends.attendenClass+1;
            let percentage=((attendClass/attends.totalClass)*100).toFixed(1);
            let newAttend=await Attendence.findByIdAndUpdate(studentAttendId,{attendenClass:attendClass,classPercent:percentage,classPrevious:currAttend});
            let allSubject=currStudent.allAttendence;
            if(allSubject.length>0){
                for(let i=0;i<allSubject.length;i++){
                    if(allSubject[i].classId===classId){
                        allSubject[i].attendenClass=attendClass;
                        allSubject[i].classPercent=percentage;
                        allSubject[i].classPrevious=currAttend;
                        await currStudent.save();
                    }
                }
            }
        }
    }
    else if(prevAttend==="Present"){
        if(currAttend==="Absent"){
            let attendClass=attends.attendenClass-1;
            let percentage=((attendClass/attends.totalClass)*100).toFixed(1);
            let newAttend=await Attendence.findByIdAndUpdate(studentAttendId,{attendenClass:attendClass,classPercent:percentage,classPrevious:currAttend});
            let allSubject=currStudent.allAttendence;
            if(allSubject.length>0){
                for(let i=0;i<allSubject.length;i++){
                    if(allSubject[i].classId===classId){
                        allSubject[i].attendenClass=attendClass;
                        allSubject[i].classPercent=percentage;
                        allSubject[i].classPrevious=currAttend;
                        await currStudent.save();
                    }
                }
            }
        }
    }
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