const expressError=require("../../../utility/expressError.js");
const newClass = require('../../../models/class.js');
const Teacher = require('../../../models/teachers.js');
const allStudent = require('../../../models/students.js');
const Attendence = require("../../../models/attendence.js");
const allCollege=require("../../../models/college.js");
const collegeTeacher=require("../../../models/collegeTeacher.js");

module.exports.destroyPage=async(req,res,next)=>{
    let{techId}=req.params;
    let currTech=await Teacher.findById(techId);
    let colleges=await allCollege.find();
    return res.render("editTeacher/deleteTeacherAccount.ejs",{colleges,currTech});
};

module.exports.destroyTeacherAccount=async(req,res,next)=>{
    let{techId}=req.params;
    let delT=await Teacher.findById(techId);
    let{username,tName,tEmail,collegeName,password}=req.body;

    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
            return match.toUpperCase();
        });
    }
    const originalString = tName;
    const capitalizedString = capitalizeWords(originalString);

    let{user}=req;
    if(user.username===username && user.teacherName===capitalizedString && user.teacherEmail===tEmail && user.collegeName===collegeName){
        let currClass=await newClass.find({teacherId:techId});
            if(currClass.length>0){
                for(let i=0;i<currClass.length;i++){
                    let destAttendence=await Attendence.deleteMany({teacherId:techId,classId:currClass[i]._id.toString()});
                    let totStudent=await allStudent.find({studentSemester:currClass[i].semester,studentSection:currClass[i].section,college:currClass[i].college});
                    if(totStudent.length>0){
                        for(let j=0;j<totStudent.length;j++){
                            let currAttend=totStudent[j].allAttendence;
                            if(currAttend.length>1){
                                for(let k=0;k<currAttend.length;k++){
                                    if(currAttend[k].classId===currClass[i]._id.toString()){
                                        await allStudent.updateOne(
                                            { _id: totStudent[j]._id },
                                            { $pull: { allAttendence: { classId: currClass[i]._id } } }
                                        );
                                    }
                                }
                            }
                            else{
                                let destroyStudents=await allStudent.deleteMany({studentSemester:currClass[i].semester,studentSection:currClass[i].section,college:currClass[i].college});
                            }
                        }
                    }
                }
            }
            let destroyClass=await newClass.deleteMany({teacherId:techId});
            let destroyTeacher=await Teacher.findByIdAndDelete(techId);
            let findAccount=await collegeTeacher.findOne({idNo:delT.teacherId,collegeName:delT.collegeName});
            let delTid=findAccount._id;
            let delAcc=findAccount.totalAccount-1;
            let destroyAcc=await collegeTeacher.findByIdAndUpdate(delTid,{totalAccount:delAcc});
            req.flash("success","Your account has been deleted successfully.");
            return res.redirect("/");
    }
    else{
        req.flash("error","Please enter all data correctly to delete your account.");
        return res.redirect(`/Attendence-Tracker/${techId}/Delete-Account`);
    }
};