let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const passport=require("passport");
const expressError=require("../../../utility/expressError.js");
// const { saveRedirectUrl } = require('../../../middlewares/authenticateTeacher.js');
const teacherControllerForLoginSignup=require("../../../controllers/teacherControllers/loginSignup/teacherLoginLogout.js");

router.get("/Teacher-Login",teacherControllerForLoginSignup.loginForm);

// Teacher's login...
router.post("/Teacher-Login",passport.authenticate(
    'teacher',{failureRedirect:'Teacher-Login',failureFlash:true
}),wrapAsync(
    teacherControllerForLoginSignup.loginUser
));

// Teachers Logout...
router.get("/Teacher-Log-Out",wrapAsync(
    teacherControllerForLoginSignup.logOut
));

module.exports=router;