const expressError=require("../../../utility/expressError.js");

module.exports.loginForm=(req,res)=>{
    return res.render("teacher/teacherLogin.ejs");
};

module.exports.loginUser=async(req,res,next)=>{
    let{user}=req;
    req.flash("success","Welcome back to Attendance Tracker.");
    return res.redirect(`/Attendance-Tracker/${user._id}/TeacherHome`);
};

module.exports.logOut=async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out successfully.");
        return res.redirect("/");
    })
};