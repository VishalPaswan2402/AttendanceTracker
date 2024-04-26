let express=require('express');
const router=express.Router();
const passport=require("passport");
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const allCollege=require("../../../models/college.js");

// College Login Page...
router.get("/College-Login",wrapAsync(async(req,res,next)=>{
    let colleges=await allCollege.find();
    res.render("college/collegeLogin.ejs",{colleges});
}));

// College Login...
router.post("/College-Login",passport.authenticate('college',{failureRedirect:'College-Login',failureFlash:true}),wrapAsync(async(req,res,next)=>{
    let{user}=req;
    let id=user._id;
    req.flash("success","Welcome back to Attendance Tracker.");
    res.redirect(`/Attendence-Tracker/${id}/College-Page`);
}));

// College logOut...
router.get("/College-Log-Out",async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out successfully.");
        res.redirect("/Attendence-Tracker/College-Login");
    })
})

module.exports=router;