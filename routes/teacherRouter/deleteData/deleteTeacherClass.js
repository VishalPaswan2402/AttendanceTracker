let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");
const teacherControllerForDeleteData=require("../../../controllers/teacherControllers/deleteData/deleteTeacherClass.js");

// Delete class...
router.delete("/Class-Destroy",isTeacLoggedIn,isOwner,wrapAsync(
    teacherControllerForDeleteData.destroyClass
));

module.exports=router;