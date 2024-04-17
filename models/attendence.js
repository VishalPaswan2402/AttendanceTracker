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
        // require:true,
    },
    attendenClass: {
        type: Number,
        default: 0,
        // require:true,
    },
    classPercent: {
        type: Number,
        default: 0,
        // require:true,
    },
    classPrevious: {
        type: String,
        default:"No",
        // require:true,
    },
    // allStudent: [Student.schema],
});

const Attendence=mongoose.model("Attendence",attendenceSchema);
module.exports=Attendence;