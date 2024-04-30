let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const {collegeTeacherSchema} = require('../../../middlewares/schema.js');
const{isCollLoggedIn,isCollegeOwner}=require("../../../middlewares/authenticateCollege.js");
const collegeControllersForTeacher=require("../../../controllers/collegeControllers/addTeacher/addCollegeTeacher.js");

const validateCollegeT=(req,res,next)=>{
    let{error}=collegeTeacherSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

// Add new teacher...
router.post("/Add-Teacher",isCollLoggedIn,isCollegeOwner,validateCollegeT,wrapAsync(
    collegeControllersForTeacher.addCollegeTeacher
));

// College home page...
router.get("/College-Page",wrapAsync(
    collegeControllersForTeacher.teacherHomePage
));

module.exports=router;