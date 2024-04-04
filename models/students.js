const { model } = require("mongoose");
const Attendence = require("./attendence.js");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const studentSchema = new Schema({
    studentName: {
        type: String,
        require:true,
    },
    studentRollNo: {
        type: String,
        require:true,
    },
    studentSemester: {
        type: String,
        require:true,
    },
    studentSection: {
        type: String,
        require:true,
    },
    teacherId: {
        type: String,
        require:true,
    },
    classId: {
        type: String,
        require:true,
    },
    college: {
        type: String,
        require:true,
    },
    allAttendence:[Attendence.schema],
});

const allStudent=mongoose.model("allStudent",studentSchema);
module.exports=allStudent;