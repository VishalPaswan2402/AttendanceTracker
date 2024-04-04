const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const newClassSchema = new Schema({
    teacherId: {
        type: String,
        require:true,
    },
    semester: {
        type: String,
        require:true,
    },
    section: {
        type: String,
        require:true,
    },
    subject:{
        type: String,
        require:true,
    },
    college: {
        type: String,
        require:true,
    },
    // allStudent: [Student.schema],
});

const newClass=mongoose.model("newClass",newClassSchema);
module.exports=newClass;