const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const teachersSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    teacherName:{
        type:String,
        required:true,
    },
    teacherEmail:{
        type:String,
        required:true,
    },
    collegeName:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});

teachersSchema.plugin(passportLocalMongoose);
const Teacher=mongoose.model("Teacher",teachersSchema);
module.exports=Teacher;
