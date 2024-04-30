const expressError=require("../../../utility/expressError.js");
const collegeAccount=require("../../../models/collegeAccount.js");
const {otpSender}=require("../../../middlewares/otpSender.js");
const {registerOtpMail}=require("../../../middlewares/registerOtpMail.js");

module.exports.resendOtpMail=async (req, res) => {
    const { collegeName, collegeType, cLocation, toEmail, password } = req.session.CollData;
    const genOtp = Math.floor(1000 + Math.random() * 9000);
    otpSender(toEmail, "Verification code for registration on Attendance Tracker.", " ", registerOtpMail(collegeName, genOtp));
    req.session.genOtp = genOtp;
    console.log(genOtp);
    let dataArray=[collegeName,collegeType,cLocation,toEmail,password,genOtp];
    req.flash("success","Verification mail sent successfully.");
    res.render("college/verifyCollegeEmail.ejs",{dataArray});
};

module.exports.verifyOTP=async(req,res,next)=>{
    let{data}=req.params;
    let{code}=req.body;
    const dataArray = data.split(',');
    const password = dataArray[4];
    const codeValue = dataArray[5];
    if(code===codeValue){
        let newCollege=new collegeAccount({username:dataArray[0],collegeType:dataArray[1],location:dataArray[2],eMail:dataArray[3]});
        let registerCollege=await collegeAccount.register(newCollege,password)
        let id=registerCollege._id;
        req.login(registerCollege,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Account created successfully.");
            res.redirect(`/Attendence-Tracker/${id}/College-Page`);
        })
    }
    else{
        req.flash("error","You have entered incorrect verification code. Please try again later.");
        res.redirect("/");
    }
};