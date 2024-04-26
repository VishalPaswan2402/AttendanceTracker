const { required, string } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const newCollegeTSchema=new Schema({
    collegeId:{
        type:String,
        required:true,
    },
    teacherName:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    idNo:{
        type:String,
        required:true,
    },
});

const newCollegeT=mongoose.model("newCollegeT",newCollegeTSchema);
module.exports=newCollegeT;