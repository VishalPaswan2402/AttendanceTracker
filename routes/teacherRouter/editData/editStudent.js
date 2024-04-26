let express=require('express');
const router=express.Router({mergeParams:true});
const allStudent = require('../../../models/students.js');
const Attendence = require("../../../models/attendence.js");
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const{studentSchema}=require("../../../middlewares/schema.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");

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

// Student Edit Page...
router.get("/Edit-Student-Page",isTeacLoggedIn,isOwner,wrapAsync(async(req,res,next)=>{
    let{stId,techId,classId}=req.params;
    let findStudent=await allStudent.findById(stId);
    res.render("student/studentEdit.ejs",{findStudent,techId,classId});
}));

//Student edit form...
router.put("/Students-Edit",isTeacLoggedIn,isOwner,validateStudent,wrapAsync(async(req,res,next)=>{
    let{techId,classId,stId}=req.params;
    let{sName,sRollNo}=req.body;
    let stEdit=await allStudent.findByIdAndUpdate(stId,({studentName:sName,studentRollNo:sRollNo}));
    req.flash("success","Student data edited successfully.");
    res.redirect(`/Attendence-Tracker/${techId}/${classId}/Attendence-Sheet`);
}));

// Destroy Student...
router.delete("/Students-Destroy",isTeacLoggedIn,isOwner,async(req,res)=>{
    let{techId,classId,stId}=req.params;
    let destroyStudent=await allStudent.findByIdAndDelete(stId);
    let destAtt=await Attendence.deleteMany({studentId:stId});
    req.flash("success","Student data deleted successfully.");
    res.redirect(`/Attendence-Tracker/${techId}/${classId}/Attendence-Sheet`);
});

module.exports=router