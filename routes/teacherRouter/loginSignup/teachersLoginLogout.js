let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const passport=require("passport");
const expressError=require("../../../utility/expressError.js");
const { saveRedirectUrl } = require('../../../middlewares/authenticateTeacher.js');

router.get("/Teacher-Login",(req,res)=>{
    res.render("teacher/teacherLogin.ejs");
});

// Teacher's login...
router.post("/Teacher-Login",saveRedirectUrl,passport.authenticate('teacher',{failureRedirect:'Teacher-Login',failureFlash:true}),wrapAsync(async(req,res,next)=>{
    let{user}=req;
    let redirectUrl=res.locals.redirectUrl || `/Attendence-Tracker/${user._id}/TeacherHome`;
    req.flash("success","Welcome back to Attendance Tracker.");
    res.redirect(redirectUrl);
}));

// Teachers Logout...
router.get("/Teacher-Log-Out",wrapAsync(async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out successfully.");
        res.redirect("/Attendence-Tracker/Teacher-Login");
    })
}));

module.exports=router;