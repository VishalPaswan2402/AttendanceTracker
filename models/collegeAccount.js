const passport=require("passport");
const LocalStrategy=require("passport-local");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const collegeAccountSchema=new Schema({
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

collegeAccountSchema.plugin(passportLocalMongoose);
const collegeAccount=mongoose.model("collegeAccount",collegeAccountSchema);
module.exports=collegeAccount;
