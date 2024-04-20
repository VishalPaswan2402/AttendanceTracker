const { required, string } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const newCollegeSchema=new Schema({
    collegeName:{
        type:String,
        required:true,
    },
    collegeType:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    eMail:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});

const newCollege=mongoose.model("newCollege",newCollegeSchema);
module.exports=newCollege;