let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const passport=require("passport");
const {isTeacLoggedIn,isOwner}=require("../../../middlewares/authenticateTeacher.js");
const teacherControllerForDeleteData=require("../../../controllers/teacherControllers/deleteData/deleteTeacherAccount.js");

// Delete Teacher Form...
router.get("/Delete-Account",isTeacLoggedIn,wrapAsync(
    teacherControllerForDeleteData.destroyPage
));

// Delete Teacher...
router.delete("/Delete-My-Account",isTeacLoggedIn,isOwner,passport.authenticate(
    'teacher',{failureRedirect: `back`,failureFlash:true
}),wrapAsync(
    teacherControllerForDeleteData.destroyTeacherAccount
));

module.exports=router;