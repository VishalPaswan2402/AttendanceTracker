const expressError=require("../../../utility/expressError.js");
const collegeTeacher=require("../../../models/collegeTeacher.js");
const teacher=require("../../../models/teachers.js");
const newClass = require('../../../models/class.js');
const allStudent = require('../../../models/students.js');
const Attendence = require("../../../models/attendence.js");

module.exports.editTeacherPage=async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let tecData=await collegeTeacher.findOne({collegeId:collId,_id:tecId});
    res.render("editCollege/editCollegeTeacher.ejs",{collId,tecId,tecData});
};

module.exports.editTeacherForm=async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let{tName,tGender,tId}=req.body;
    let techerId=await collegeTeacher.findOne({idNo:tId});
    if(!techerId){
        let curTeac=await collegeTeacher.findByIdAndUpdate(tecId,{teacherName:tName,gender:tGender,idNo:tId});
        req.flash("success","Teacher data updated successfully.");
        res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
    }
    else{
        let curTeac=await collegeTeacher.findByIdAndUpdate(tecId,{teacherName:tName,gender:tGender});
        req.flash("success","Teacher's data updated except ID.");
        res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
    }
};

module.exports.destroyTeacher=async(req,res,next)=>{
    let{collId,tecId}=req.params;
    let currCollegeTech=await collegeTeacher.findById(tecId);
    let currTech=await teacher.find({teacherId:currCollegeTech.idNo});
    if(currTech.length>0){
        for(let m=0;m<currTech.length;m++){
        let currClass=await newClass.find({teacherId:currTech[m]._id});
        if(currClass.length>0){
            for(let i=0;i<currClass.length;i++){
                let destAttendence=await Attendence.deleteMany({teacherId:currTech[m]._id,classId:currClass[i]._id.toString()});
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
        let destroyClass=await newClass.deleteMany({teacherId:currTech[m]._id});
        let destroyTeacher=await teacher.findByIdAndDelete(currTech[m]._id);
        }
    }
    let destroyCollegeTeacher=await collegeTeacher.findByIdAndDelete(tecId); 
    req.flash("success","Teacher's data deleted successfully.");
    res.redirect(`/Attendence-Tracker/${collId}/College-Page`);
};