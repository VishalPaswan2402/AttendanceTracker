let express=require('express');
const router=express.Router();
const wrapAsync = require('../../../utility/wrapAsync.js');
const expressError=require("../../../utility/expressError.js");
const collegeControllerForChangePassword=require("../../../controllers/collegeControllers/changePassword/changeCollegePassword.js");

// Forget password page...
router.get("/Forget-college-Password",wrapAsync(
    collegeControllerForChangePassword.forgetPage
));

// Find forget account data...
router.post("/Restore-College-Password",wrapAsync(
    collegeControllerForChangePassword.forgetFormData
));

// Verify code...
router.post("/:id/Verify-College-Password-Code",wrapAsync(
    collegeControllerForChangePassword.verifyEmail
));

// Update new password...
router.put("/:id/Change-College-Password",wrapAsync(
    collegeControllerForChangePassword.changePassword
));

module.exports=router;