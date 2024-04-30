let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const{newClassSchema}=require("../../../middlewares/schema.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");
const teacherControllersForAddData=require("../../../controllers/teacherControllers/addData/addNewClass.js");

// Validate Class...
const validatenewClass=(req,res,next)=>{
    let{error}=newClassSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

// To add new class...
router.post("/New-Class",isTeacLoggedIn,isOwner,validatenewClass,wrapAsync(
    teacherControllersForAddData.addNewClass
));

module.exports=router;