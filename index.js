let express=require('express');
const app=express();
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let port="8080";
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const mongoose = require('mongoose');
const expressError=require("./utility/expressError.js");
const bcrypt=require("bcrypt");
const college=require("./models/college.js");
const collegeName=require("./models/collegeName.js");
const collegeLoginLogout=require("./routes/collegeRouter/loginSignup/collegeLoginLogout.js");
const collegeSignUp=require("./routes/collegeRouter/loginSignup/collegeSignUp.js");
const sendVerifyCollegeOtp=require("./routes/collegeRouter/loginSignup/sendVerifyCollegeOtp.js");
const changeCollegePassword=require("./routes/collegeRouter/changePassword/changeCollegePassword.js");
const teacherSignUp=require("./routes/teacherRouter/loginSignup/teacherSignUp.js");
const teachersLoginLogout=require("./routes/teacherRouter/loginSignup/teachersLoginLogout.js");
const students=require("./routes/studentRouter/student.js");
const changeTeacherPassword=require("./routes/teacherRouter/editData/changeTeacherPassword.js");
const editStudent=require("./routes/teacherRouter/editData/editStudent.js");
const addNewClass=require("./routes/teacherRouter/addData/addNewClass.js");
const teacherHomePage=require("./routes/teacherRouter/loginSignup/teacherHomePage.js");
const addNewStudent=require("./routes/teacherRouter/addData/addNewStudent.js");
const markAttendance=require("./routes/teacherRouter/attendance/markAttendance.js");
const printAttendance=require("./routes/teacherRouter/attendance/printAttendance.js");
const deleteTeacherAccount=require("./routes/teacherRouter/deleteData/deleteTeacherAccount.js");
const searchTeacher=require("./routes/collegeRouter/addTeacher/searchTeacher.js");
const addCollegeTeacher=require("./routes/collegeRouter/addTeacher/addCollegeTeacher.js");
const editCollegeTeacher=require("./routes/collegeRouter/addTeacher/editCollegeTeacher.js");
const deleteTeacherClass=require("./routes/teacherRouter/deleteData/deleteTeacherClass.js");
const sendVerifyTeacherOtp=require("./routes/teacherRouter/loginSignup/sendVerifyTeacherOtp.js");
const guide=require("./routes/userGuide/guide.js");
// const saveAllColleges=require("./middlewares/saveCollegeName.js");

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const flash = require('connect-flash');
const session=require("express-session");
const passport=require("./middlewares/passportConfig.js");

const sessionOption={
    secret:'attendancetracker',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
         maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/Attendance')
  .then(() => console.log('Connected!'));

// Middleware for flash message and store current User...
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUsers=req.user;
    next();
})  

// All Routers...
app.use("/Attendence-Tracker",collegeLoginLogout);
app.use("/Attendence-Tracker/:id",addCollegeTeacher);
app.use("/Attendence-Tracker",collegeSignUp);
app.use("/Attendence-Tracker",sendVerifyCollegeOtp);
app.use("/Attendence-Tracker",changeCollegePassword);
app.use("/Attendence-Tracker/:id",searchTeacher);
app.use("/Attendence-Tracker/:collId/:tecId",editCollegeTeacher);
app.use("/Attendence-Tracker",teacherSignUp);
app.use("/Attendence-Tracker",sendVerifyTeacherOtp);
app.use("/Attendence-Tracker",teachersLoginLogout);
app.use("/Attendence-Tracker",students);
app.use("/Attendence-Tracker",changeTeacherPassword);
app.use("/Attendence-Tracker/:techId/:classId/:stId",editStudent);
app.use("/Attendence-Tracker/:id",addNewClass);
app.use("/Attendence-Tracker/:id",teacherHomePage);
app.use("/Attendence-Tracker/:idTeacher/:idClass",addNewStudent);
app.use("/Attendence-Tracker",markAttendance);
app.use("/Attendence-Tracker/:techId/:sub/:classId",printAttendance);
app.use("/Attendence-Tracker/:techId/:classId",deleteTeacherClass);
app.use("/Attendence-Tracker/:techId",deleteTeacherAccount);
app.use("/Attendence-Tracker",guide);
// All Routers...

// Home page...
app.get("/",(req,res)=>{
    res.render("homePage/home");
});

app.all("*",(req,res,next)=>{
    next(new expressError(404,"Page Not Found !"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong..."}=err;
    res.status(statusCode).render("errorAndGuide/error.ejs",{message});
});

app.listen(port,()=>{
    console.log("Server is listening...")
});
