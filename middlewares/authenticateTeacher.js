module.exports.isTeacLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in.");
        return res.redirect("/Attendence-Tracker/Teacher-Login");
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { techId } = req.params;
    let{user}=req;
    if (!user && user._id.equals(techId)) {
        req.flash("error", "You don't have any access to this account.");
        return res.redirect("/Attendence-Tracker/Teacher-Login");
    } 
    next();
};