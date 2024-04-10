let express=require('express');
const app=express();
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
let port="8080";
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const mongoose = require('mongoose');
const expressError=require("./utility/expressError.js");
const college=require("./models/college.js");
const collegeName=require("./models/collegeName.js");
const teachers=require("./routes/teachers.js");
const students=require("./routes/student.js");
const changePassword=require("./routes/changePassword.js");
const editStudent=require("./routes/editStudent.js");
const addClass=require("./routes/newClass.js");
const newStudent=require("./routes/newStudent.js");
const markAttendance=require("./routes/markAttendance.js");
const printAttendance=require("./routes/printAttendance.js");
const guide=require("./routes/guide.js");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const flash = require('connect-flash');
const session=require("express-session");

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


mongoose.connect('mongodb://127.0.0.1:27017/Attendance')
  .then(() => console.log('Connected!'));

// Middleware for flash message...
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})  


// Save college names...

// collegeName.forEach(College => {
//     // Create a new College document
//     const newCollege = new college({
//         colleges: College.college,
//     });

//     // Save the document to the database
//     newCollege.save()
//         .then(savedCollege => {
//             console.log(`Saved ${savedCollege.colleges} to the database.`);
//         })
//         .catch(error => {
//             console.error(`Error saving college: ${error}`);
//         });
// });

// Save college names...


// Route For Teacher...
app.use("/Attendence-Tracker",teachers);

// Route For Student...
app.use("/Attendence-Tracker",students);

// To change password...
app.use("/Attendence-Tracker",changePassword);

// Edit students...
app.use("/Attendence-Tracker/:techId/:classId/:stId",editStudent);

// New class...
app.use("/Attendence-Tracker/:id",addClass);

// New Student...
app.use("/Attendence-Tracker/:idTeacher/:idClass",newStudent);

// Mark attendence...
app.use("/Attendence-Tracker",markAttendance);

// Print Attendance...
app.use("/Attendence-Tracker/:techId/:sub/:classId",printAttendance);

// Guide...
app.use("/Attendence-Tracker",guide);

// Home page...
app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.all("*",(req,res,next)=>{
    next(new expressError(404,"Page Not Found !"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong..."}=err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(port,()=>{
    console.log("Server is listening...")
});

