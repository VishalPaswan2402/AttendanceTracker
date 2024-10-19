const expressError=require("../../../utility/expressError.js");
const Teacher = require('../../../models/teachers.js');
const collegeTeacher=require("../../../models/collegeTeacher.js");
const {otpSender}=require("../../../middlewares/otpSender.js");
const {registerOtpMail}=require("../../../middlewares/registerOtpMail.js");

module.exports.resendMail=async (req, res) => {
    const { username,teacherName,teacherId,teacherEmail,collegeName,subject1,password } = req.session.TechData;
    const genOtp = Math.floor(1000 + Math.random() * 9000);
    otpSender(teacherEmail, "Verification code for registration on Attendance Tracker.", " ", registerOtpMail(teacherName, genOtp));
    req.session.genOtp = genOtp;
    console.log(genOtp);
    let dataArray=[username,teacherName,teacherId,teacherEmail,collegeName,subject1,password,genOtp];
    req.flash("success","Verification code sent successfully");
    return res.render("teacher/verifyTeacherEmail.ejs",{dataArray});
};

module.exports.verifyTeacher=async(req,res,next)=>{
    let{data}=req.params;
    let{code}=req.body;
    const dataArray = data.split(',');
    const password = dataArray[6];
    const codeValue = dataArray[7];
    if(code===codeValue){
        function capitalizeWords(str) {
            return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
                return match.toUpperCase();
            });
        }
        const originalString = dataArray[1];
        const capitalizedString = capitalizeWords(originalString);
        let newTeacher=new Teacher({username:dataArray[0],teacherName:capitalizedString,teacherId:dataArray[2],teacherEmail:dataArray[3],collegeName:dataArray[4],subject:dataArray[5]});        
        let registerTeacher=await Teacher.register(newTeacher,password);
        let findAccount= await collegeTeacher.findOne({idNo:dataArray[2],collegeName:dataArray[4]});
        let newAccount=findAccount.totalAccount+1;
        let totalAcc=await collegeTeacher.findByIdAndUpdate(findAccount._id,{totalAccount:newAccount});
        let id=newTeacher._id;
        req.login(registerTeacher,(err)=>{
        if(err){
            return next(err);
        }
        req.session.idv=id;
        req.session.type='teacher';
        req.flash("success","Account created successfully.");
        return res.redirect(`/Attendance-Tracker/${id}/TeacherHome`);
        })
    }
    else{
        req.flash("error","You have entered incorrect verification code. Please try again later.");
        return res.redirect("/");
    }
};