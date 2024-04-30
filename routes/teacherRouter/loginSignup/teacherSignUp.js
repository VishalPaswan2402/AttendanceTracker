let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const{teachersSchema}=require("../../../middlewares/schema.js");
const expressError=require("../../../utility/expressError.js");
const teacherControllerForLoginSignup=require("../../../controllers/teacherControllers/loginSignup/teacherSignup.js");

const validateTeacher=(req,res,next)=>{
    let{error}=teachersSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

// Teacher signup page...
router.get("/Teacher-SignUp",wrapAsync(
    teacherControllerForLoginSignup.sigupForm
));

// Teacher signup...
router.post("/Teacher-SignUp",validateTeacher,wrapAsync(
    teacherControllerForLoginSignup.saveTeacherData
));

module.exports=router;