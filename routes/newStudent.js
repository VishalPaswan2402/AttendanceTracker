let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const{studentSchema}=require("../schema.js");
const newClass = require('../models/class.js');
const Teacher = require('../models/teachers.js');
const allStudent = require('../models/students.js');
const Attendence = require("../models/attendence.js");



// Validate student...
const validateStudent=(req,res,next)=>{
    let{error}=studentSchema.validate(req.body.student);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

//To add new student...
router.post("/New-Student",validateStudent,wrapAsync(async(req,res,next)=>{
    let{idTeacher,idClass}=req.params;
    let{studentName,studentRollNo}=req.body;
    let currClass=await newClass.findById(idClass);
    let studentSemester=currClass.semester;
    let studentSection=currClass.section;
    let college=currClass.college;
    let classId=idClass;
    let teacherId=idTeacher;
    let newTeacher=await Teacher.findById(teacherId);
    let findStudent=await allStudent.find({studentRollNo:studentRollNo,studentSemester:studentSemester,studentSection:studentSection,college:college});
    if(findStudent.length<1){
        let newStudent= new allStudent({studentName:studentName,studentRollNo:studentRollNo,studentSemester:studentSemester,studentSection:studentSection,teacherId:teacherId,classId:classId,college:college});
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
        req.flash("success","Student added to your class successfully...");
        res.redirect(`/Attendence-Tracker/${idTeacher}/${idClass}/Attendence-Sheet`);
    }
    else{
        req.flash("error","Student with same roll no. already added in sheet...");
        res.redirect(`/Attendence-Tracker/${idTeacher}/${idClass}/Attendence-Sheet`);
        // next(new expressError(400,"Student with same roll no. already added in sheet..."));
    }
}));

//Teachers attendence sheet page...
router.get("/Attendence-Sheet",wrapAsync(async(req,res,next)=>{
    let{idTeacher,idClass}=req.params;
    let classTech=await Teacher.findById(idTeacher);
    let allClass=await newClass.findById(idClass);
    let students=await allStudent.find({studentSemester:allClass.semester,studentSection:allClass.section,college:allClass.college});
    let studentAttendence=await Attendence.find({teacherId:idTeacher,classId:idClass}); 
    res.render("techPage.ejs",{classTech,students,allClass,studentAttendence});
}));

module.exports=router;