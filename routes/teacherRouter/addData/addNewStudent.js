let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const{studentSchema}=require("../../../middlewares/schema.js");
const newClass = require('../../../models/class.js');
const Teacher = require('../../../models/teachers.js');
const allStudent = require('../../../models/students.js');
const Attendence = require("../../../models/attendence.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");

// Validate student...
const validateStudent=(req,res,next)=>{
    let{error}=studentSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

//To add new student...
router.post("/New-Student",isTeacLoggedIn,isOwner,validateStudent,wrapAsync(async(req,res,next)=>{
    let{idTeacher,idClass}=req.params;
    let{studentName,studentRollNo}=req.body;
    let currClass=await newClass.findById(idClass);
    let studentSemester=currClass.semester;
    let studentSection=currClass.section;
    let college=currClass.college;
    let classId=idClass;
    let teacherId=idTeacher;
    function capitalizeWords(str) {
        return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
            return match.toUpperCase();
        });
    }
    const originalString = studentName;
    const capitalizedString = capitalizeWords(originalString);
    let newTeacher=await Teacher.findById(teacherId);
    let findStudent=await allStudent.findOne({studentRollNo:studentRollNo,studentSemester:studentSemester,studentSection:studentSection,college:college});
    if(!findStudent){
        let newStudent= new allStudent({studentName:capitalizedString,studentRollNo:studentRollNo,studentSemester:studentSemester,studentSection:studentSection,teacherId:teacherId,classId:classId,college:college});
        await newStudent.save();
        let studentId=newStudent._id;
        let subject=newTeacher.subject;
        let newAttendence=new Attendence({subject:subject,teacherId:teacherId,classId:classId,studentId:studentId});
        await newAttendence.save();
        newStudent.allAttendence.push(newAttendence);
        await newStudent.save();
        let allClass=await newClass.find({semester:studentSemester,section:studentSection,college:college});
        if(allClass.length>0){
            for(let i=0;i<allClass.length;i++){
                if(allClass[i].subject!=subject){
                    let addSub=allClass[i].subject;
                    let addTechId=allClass[i].teacherId.toString();
                    let addClassId=allClass[i]._id.toString();
                    let addStudId=newStudent._id.toString();
                    let addNewAttendence=new Attendence({subject:addSub,teacherId:addTechId,classId:addClassId,studentId:addStudId});
                    await addNewAttendence.save();
                    newStudent.allAttendence.push(addNewAttendence);
                    await newStudent.save();
                }
            }
        }
        req.flash("success","Student added to your class successfully.");
        res.redirect(`/Attendence-Tracker/${idTeacher}/${idClass}/Attendence-Sheet`);
    }
    else{
        req.flash("error","A student with the same roll number has already been added to the sheet.");
        res.redirect(`/Attendence-Tracker/${idTeacher}/${idClass}/Attendence-Sheet`);
    }
}));

//Teachers attendence sheet page...
router.get("/Attendence-Sheet",isTeacLoggedIn,isOwner,wrapAsync(async(req,res,next)=>{
    let{idTeacher,idClass}=req.params;
    let classTech=await Teacher.findById(idTeacher);
    let allClass=await newClass.findById(idClass);
    let students=await allStudent.find({studentSemester:allClass.semester,studentSection:allClass.section,college:allClass.college});
    let studentAttendence=await Attendence.find({teacherId:idTeacher,classId:idClass}); 
    res.render("teacher/teacherPage.ejs",{classTech,students,allClass,studentAttendence});
}));

module.exports=router;