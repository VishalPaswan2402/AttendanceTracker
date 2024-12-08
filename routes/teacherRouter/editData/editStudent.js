let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const{studentSchema}=require("../../../middlewares/schema.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");
const teacherControllerForEditData=require("../../../controllers/teacherControllers/editData/editStudents.js");

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
router.get("/Edit-Student-Page",isTeacLoggedIn,isOwner,wrapAsync(
    teacherControllerForEditData.editStudentForm
));

//Student edit form...
router.put("/Students-Edit",isTeacLoggedIn,isOwner,validateStudent,wrapAsync(
    teacherControllerForEditData.editStudentData
));

// Destroy Student...
router.delete("/Students-Destroy",isTeacLoggedIn,isOwner,wrapAsync(
    teacherControllerForEditData.destroyStudents
));

module.exports=router