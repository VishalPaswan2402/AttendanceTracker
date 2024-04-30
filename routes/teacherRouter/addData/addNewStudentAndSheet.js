let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const{studentSchema}=require("../../../middlewares/schema.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");
const teacherControllersForAddData=require("../../../controllers/teacherControllers/addData/addNewStudentAndSheet.js");

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
router.post("/New-Student",isTeacLoggedIn,isOwner,validateStudent,wrapAsync(
    teacherControllersForAddData.addNewStudent
));

//Teachers attendence sheet page...
router.get("/Attendence-Sheet",isTeacLoggedIn,isOwner,wrapAsync(
    teacherControllersForAddData.teacherSheet
));

module.exports=router;