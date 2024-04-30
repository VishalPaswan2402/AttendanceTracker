let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const collegeControllersForLoginSignup=require("../../../controllers/collegeControllers/loginSignup/sendVerifyCollegeOtp.js");

// Resend college otp mail...
router.get("/Resent-College-OTP", wrapAsync(
    collegeControllersForLoginSignup.resendOtpMail
));

// Verify email 
router.post("/Verify-College-Email-Code/:data",wrapAsync(
    collegeControllersForLoginSignup.verifyOTP
));

module.exports=router;