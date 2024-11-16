if(process.env.NODE_EVN !="production"){
    require("dotenv").config();
}
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
const addNewStudentAndSheet=require("./routes/teacherRouter/addData/addNewStudentAndSheet.js");
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
const MongoStore = require('connect-mongo');
const passport=require("./middlewares/passportConfig.js");
const collegeAccount = require("./models/collegeAccount.js");
const Teacher = require("./models/teachers.js");
// let dbUrl=process.env.atlasUrl;
let dbUrl='mongodb://127.0.0.1:27017/Attendance'

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.secretPass
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("Error in mongoos session...",err);
})

const sessionOption={
    store,
    secret:process.env.secretPass,
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

mongooseFunction()
    .then(()=>{
        console.log("Connected to database...")
    })
    .catch((err)=>{
        console.log(err);
    });
async function mongooseFunction() {
    await mongoose.connect(dbUrl);
};

// Middleware for flash message and store current User...
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUsers=req.user;
    next();
})  

// All Routers...
app.use("/Attendance-Tracker",collegeLoginLogout);
app.use("/Attendance-Tracker/:id",addCollegeTeacher);
app.use("/Attendance-Tracker",collegeSignUp);
app.use("/Attendance-Tracker",sendVerifyCollegeOtp);
app.use("/Attendance-Tracker",changeCollegePassword);
app.use("/Attendance-Tracker/:id",searchTeacher);
app.use("/Attendance-Tracker/:collId/:tecId",editCollegeTeacher);
app.use("/Attendance-Tracker",teacherSignUp);
app.use("/Attendance-Tracker",sendVerifyTeacherOtp);
app.use("/Attendance-Tracker",teachersLoginLogout);
app.use("/Attendance-Tracker",students);
app.use("/Attendance-Tracker",changeTeacherPassword);
app.use("/Attendance-Tracker/:techId/:classId/:stId",editStudent);
app.use("/Attendance-Tracker/:id",addNewClass);
app.use("/Attendance-Tracker/:id",teacherHomePage);
app.use("/Attendance-Tracker/:idTeacher/:idClass",addNewStudentAndSheet);
app.use("/Attendance-Tracker",markAttendance);
app.use("/Attendance-Tracker/:techId/:sub/:classId",printAttendance);
app.use("/Attendance-Tracker/:techId/:classId",deleteTeacherClass);
app.use("/Attendance-Tracker/:techId",deleteTeacherAccount);
app.use("/Attendance-Tracker",guide);
// All Routers...

// Home page...
app.get("/",async(req,res)=>{
    let idv=req.session.idv;
    if(idv){
        let type=req.session.type;
        if(type=='college'){
            let collAcc=await collegeAccount.findById(idv);
            if(collAcc){
                return res.redirect(`/Attendance-Tracker/${idv}/College-Page`);
            }
        }
        else if(type=='teacher'){
            let teachAcc=await Teacher.findById(idv);
            if(teachAcc){
                return res.redirect(`/Attendance-Tracker/${idv}/TeacherHome`);
            }
        }
    }
    return res.render("homePage/home");
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
