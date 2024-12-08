const { required, string, number } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const collegeTeacherSchema=new Schema({
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
    collegeName:{
        type:String,
        required:true,
    },
    totalAccount:{
        type:Number,
        default:0,
    },
});

const collegeTeacher=mongoose.model("collegeTeacher",collegeTeacherSchema);
module.exports=collegeTeacher;