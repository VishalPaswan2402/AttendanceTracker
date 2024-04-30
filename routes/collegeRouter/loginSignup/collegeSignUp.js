let express=require('express');
const router=express.Router();
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const {collegeAccountSchema} = require('../../../middlewares/schema.js');
const collegeControllersforLoginSignup=require("../../../controllers/collegeControllers/loginSignup/collegeSignUp.js");

const validateCollege=(req,res,next)=>{
    let{error}=collegeAccountSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};

// College Signup Page...
router.get("/College-SignUp",wrapAsync(
    collegeControllersforLoginSignup.signUpPage
));

// College SignUp...
router.post("/College-SignPage",validateCollege,wrapAsync(
    collegeControllersforLoginSignup.signUpUser
));

module.exports=router;