let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");
const teacherControllersForAttendance=require("../../../controllers/teacherControllers/attendance/markAttendance.js");

// For marking present and absent for all students...
router.post("/Submit-All-Attendance",isTeacLoggedIn,isOwner,wrapAsync(
    teacherControllersForAttendance.markAttendanceOfStudents
));

module.exports=router;