let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const allCollege=require("../../../models/college.js");
const collegeReg=require("../../../models/collegeReg.js");
const { newCollegeSchema } = require('../../../middlewares/schema.js');

const validateCollege=(req,res,next)=>{
    let{error}=newCollegeSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

// College Signup Page...
router.get("/College-SignUp",wrapAsync(async(req,res,next)=>{
    let colleges=await allCollege.find();
    const collegeData=req.session.CollData || {};
    delete req.session.CollData;
    res.render("college/collegeSignUp.ejs",{colleges,collegeData});
}));

// College SignUp...
router.post("/College-SignPage",validateCollege,wrapAsync(async(req,res,next)=>{
    let{collegeName,collegeType,cLocation,eMail,password,cPassword}=req.body;
    if(password!=cPassword){
        req.session.CollData={collegeName,collegeType,cLocation,eMail};
        req.flash("error","Password not match.");
        res.redirect("/Attendence-Tracker/College-SignUp");
    }
    else{
        let findColl=await collegeReg.findOne({username:collegeName});
        if(findColl){
            req.flash("error","Account already exist. Please Login to your account.");
            res.redirect("/Attendence-Tracker/College-Login")
        }
        else{
            let newCollege=new collegeReg({username:collegeName,collegeType:collegeType,location:cLocation,eMail:eMail});
            let registerCollege=await collegeReg.register(newCollege,password)
            let id=registerCollege._id;
            req.login(registerCollege,(err)=>{
                if(err){
                    return next(err);
                }
                req.flash("success","Account created successfully.");
                res.redirect(`/Attendence-Tracker/${id}/College-Page`);
            })
        }
    }
}));

module.exports=router;