const { required, string } = require("joi");
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
});

const collegeTeacher=mongoose.model("collegeTeacher",collegeTeacherSchema);
module.exports=collegeTeacher;