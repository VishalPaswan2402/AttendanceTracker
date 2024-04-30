let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const teacherControllerForEditData=require("../../../controllers/teacherControllers/editData/changeTeacherPassword.js");

// Forget password form...
router.get("/Forgot-Teacher-Password",wrapAsync(
    teacherControllerForEditData.forgetPasswordPage
));

// Find forget password data...
router.get("/Restore-Teacher-Password",wrapAsync(
    teacherControllerForEditData.forgetPasswordForm
));

// Verify code..
router.post("/:id/:pin/Verify-Teacher-Password-Code",wrapAsync(
    teacherControllerForEditData.verifyOTP
));

// Update new password...
router.put("/:id/Change-Teacher-Password",wrapAsync(
    teacherControllerForEditData.changePassword
));

module.exports=router;