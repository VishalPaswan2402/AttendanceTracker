let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");
const teacherControllersForAttendance=require("../../../controllers/teacherControllers/attendance/printAttendance.js");

// To print attendence sheet of all students...
router.get("/Print-All-Attendance-sheet",isTeacLoggedIn,isOwner,wrapAsync(
    teacherControllersForAttendance.printAll
));

// To print attendence sheet of detained students...
router.get("/Print-Detained-Attendance-sheet",isTeacLoggedIn,isOwner,wrapAsync(
    teacherControllersForAttendance.printDetained
));

module.exports=router;