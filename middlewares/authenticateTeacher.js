module.exports.isTeacLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;   // Redirect url link...
        req.flash("error","You must be logged in.");
        return res.redirect("/Attendence-Tracker/Teacher-Login");
    }
    next();
};


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async (req, res, next) => {
    const { techId } = req.params;
    let{user}=req;
    if (!user && user._id.equals(techId)) {
        req.flash("error", "You don't have access to delete this account.");
        return res.redirect("/Attendence-Tracker/Teacher-Login");
    } 
    next();
};