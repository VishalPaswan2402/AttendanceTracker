let express=require('express');
const app=express();
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
let port="8080";


// Home Page...
app.get("/",(req,res)=>{
    res.render("home.ejs");
})


// Student Login Page...
app.get("/student_login",(req,res)=>{
    res.render("login.ejs");
})


// Teacher's Signup Page...
app.get("/teacher_signup",(req,res)=>{
    res.render("signup.ejs");
})


// Teacher's Login Page...
app.get("/teacher_login",(req,res)=>{
    res.render("tLogin.ejs");
})


// Student's Attendance Page...
app.get("/student_page",(req,res)=>{
    res.render("stPage.ejs");
})


app.get("/teacher_page",(req,res)=>{
    res.render("techPage.ejs");
})


app.listen(port,()=>{
    console.log("Server is listening...")
})

