const collName=require("./collegeName.js");
const Attendence = require("./attendence.js");
const mongoose=require("mongoose");
const { required } = require("joi");
const Schema=mongoose.Schema;

const collegeSchema = new Schema({
    colleges:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
});

const college=mongoose.model("college",collegeSchema);
module.exports=college;

