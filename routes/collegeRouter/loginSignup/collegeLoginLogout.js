let express=require('express');
const router=express.Router();
const passport=require("passport");
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const collegeControllersforLoginSignup=require("../../../controllers/collegeControllers/loginSignup/collegeLoginLogout.js");

// College Login Page...
router.get("/College-Login",wrapAsync(
    collegeControllersforLoginSignup.loginPage
));

// College Login...
router.post("/College-Login",passport.authenticate(
    'college',{failureRedirect:'College-Login',failureFlash:true
}),wrapAsync(
    collegeControllersforLoginSignup.loginUser
));

// College logOut...
router.get("/College-Log-Out",wrapAsync(
    collegeControllersforLoginSignup.logOut
));

module.exports=router;