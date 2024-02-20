let express=require('express');
const app=express();
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
let port="8080";


app.get("/",(req,res)=>{
    res.render("login.ejs");
})










app.listen(port,()=>{
    console.log("Server is listening...")
})