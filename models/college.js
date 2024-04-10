const collName=require("./collegeName.js");
const Attendence = require("./attendence.js");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const collegeSchema = new Schema({
    colleges:{
        type:String,
    },
});

const college=mongoose.model("college",collegeSchema);
module.exports=college;

