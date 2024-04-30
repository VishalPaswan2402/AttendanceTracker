let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const teacherControllerForLoginSignup=require("../../../controllers/teacherControllers/loginSignup/sendVerifyTeacherOtp.js");

// Resend teacher otp mail...
router.get("/Resend-Teacher-OTP",wrapAsync(
    teacherControllerForLoginSignup.resendMail
));

// Teacher email verification...
router.post("/Verify-Teacher-Email-Code/:data",wrapAsync(
    teacherControllerForLoginSignup.verifyTeacher
));

module.exports=router;