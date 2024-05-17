const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const attendenceSchema = new Schema({
    subject: {
        type: String,
        required:true,
    },
    teacherId: {
        type: String,
        required:true,
    },
    classId: {
        type: String,
        required:true,
    },
    studentId: {
        type: String,
        required:true,
    },
    totalClass: {
        type: Number,
        default: 0,
    },
    attendenClass: {
        type: Number,
        default: 0,
    },
    classPercent: {
        type: Number,
        default: 0,
    },
    classPrevious: {
        type: String,
        default:"-",
    },
    markedOn: {
        type: String,
        default:"-",
    },
});

const Attendence=mongoose.model("Attendence",attendenceSchema);
module.exports=Attendence;