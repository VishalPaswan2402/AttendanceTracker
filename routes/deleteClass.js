let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const newClass = require('../models/class.js');
const Attendence = require("../models/attendence.js");
const allStudent = require('../models/students.js');

// Delete class...
router.delete("/Class-Destroy",wrapAsync(async(req,res)=>{
    let {techId,classId}=req.params;
    let currClass=await newClass.findById(classId);
    let sec=currClass.section;
    let sem=currClass.semester;
    let totalStudent=await allStudent.find({studentSemester:currClass.semester,studentSection:currClass.section,college:currClass.college});
    if(totalStudent.length>0){
        for(let i=0;i<totalStudent.length;i++){
            if(totalStudent[i].allAttendence.length>1){
                for(let j=0;j<totalStudent[i].allAttendence.length;j++){
                    if(totalStudent[i].allAttendence[j].classId===classId){
                        totalStudent[i].allAttendence.splice(j, 1);
                        await totalStudent[i].save();
                    }
                }
            }
            else{
                let c= totalStudent[i]._id;
                await allStudent.deleteOne({_id:c});
            }
        }
    }
    let currAttend=await Attendence.deleteMany({classId:classId});
    let delcurrClass=await newClass.deleteMany({_id:classId});
    req.flash("success", `${sem} ${sec} class deleted successfully...`);
    res.redirect(`/Attendence-Tracker/${techId}/TeacherHome`);
}));

module.exports=router;