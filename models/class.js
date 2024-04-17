const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const newClassSchema = new Schema({
    teacherId: {
        type: String,
        required:true,
    },
    semester: {
        type: String,
        required:true,
    },
    section: {
        type: String,
        required:true,
    },
    subject:{
        type: String,
        required:true,
    },
    college: {
        type: String,
        required:true,
    },
});

const newClass=mongoose.model("newClass",newClassSchema);
module.exports=newClass;