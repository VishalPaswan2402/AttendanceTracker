let express=require('express');
const router=express.Router();
const wrapAsync=require("../../utility/wrapAsync.js");
const expressError=require("../../utility/expressError.js");
const studentControllersForStudents=require("../../controllers/studentsControllers/student.js");

// Login form...
router.get("/Students-Login",wrapAsync(
    studentControllersForStudents.loginPage
));

// Students Page...
router.get("/Students-Page",wrapAsync(
    studentControllersForStudents.studentPage
));

module.exports=router;