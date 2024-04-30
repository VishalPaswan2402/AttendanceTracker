let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const teacherControllerForLoginSignup=require("../../../controllers/teacherControllers/loginSignup/teacherHomePage.js");

// For teacher homepage...
router.get("/TeacherHome",wrapAsync(
    teacherControllerForLoginSignup.teacherHomePage
));

module.exports=router;