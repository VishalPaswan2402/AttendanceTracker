module.exports.isCollLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in.");
        return res.redirect("/Attendence-Tracker/College-Login");
    }
    next();
};


module.exports.isCollegeOwner = async (req, res, next) => {
    const { id } = req.params;
    let{user}=req;
    if (!user && user._id.equals(id)) {
        req.flash("error", "You don't have access to add teacher ID.");
        return res.redirect("/Attendence-Tracker/College-Login");
    } 
    next();
};
