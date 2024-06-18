const expressError=require("../../../utility/expressError.js");
const allCollege=require("../../../models/college.js");

module.exports.loginPage=async(req,res,next)=>{
    let colleges=await allCollege.find();
    return res.render("college/collegeLogin.ejs",{colleges});
};

module.exports.loginUser=async(req,res,next)=>{
    let{user}=req;
    let id=user._id;
    req.flash("success","Welcome back to Attendance Tracker.");
    return res.redirect(`/Attendance-Tracker/${id}/College-Page`);
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