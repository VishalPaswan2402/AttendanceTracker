const { model } = require("mongoose");
const newClass = require("./class.js");

const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const teachersSchema=new Schema({
    teacherName:{
        type:String,
        require:true,
    },
    teacherEmail:{
        type:String,
        require:true,
    },
    collegeName:{
        type:String,
        require:true,
    },
    // branch:{
    //     type:String,
    //     require:true,
    // },
    subject:{
        type:String,
        require:true,
    },
    // year:{
    //     type:Number,
    //     require:true,
    // },
    // semester:{
    //     type:Number,
    //     require:true,
    // },
    // section:{
    //     type:Number,
    //     require:true,
    // },
    password:{
        type:String,
        require:true,
    },
    // students: [Student.schema],
    // allClass:[newClass.schema],
});

const Teacher=mongoose.model("Teacher",teachersSchema);
module.exports=Teacher;
