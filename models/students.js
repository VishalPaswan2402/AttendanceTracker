const { model } = require("mongoose");
const Attendence = require("./attendence.js");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const studentSchema = new Schema({
    studentName: {
        type: String,
        required:true,
    },
    studentRollNo: {
        type: String,
        required:true,
    },
    studentSemester: {
        type: String,
        required:true,
    },
    studentSection: {
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
    college: {
        type: String,
        required:true,
    },
    allAttendence:[Attendence.schema],
});

const allStudent=mongoose.model("allStudent",studentSchema);
module.exports=allStudent;