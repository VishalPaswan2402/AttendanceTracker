const passport=require("passport");
const LocalStrategy=require("passport-local");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const newCollegeSchema=new Schema({
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
});

newCollegeSchema.plugin(passportLocalMongoose);
const newCollege=mongoose.model("newCollege",newCollegeSchema);
module.exports=newCollege;
