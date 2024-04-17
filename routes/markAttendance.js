let express=require('express');
const router=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const expressError=require("../utility/expressError.js");
const Attendence = require("../models/attendence.js");
const allStudent = require('../models/students.js');

// For marking present and absent for all students...
router.post("/Submit-All-Attendence",wrapAsync( async (req, res,next) => {
    let techId;
    let claId;
    let presentIds = req.body.allPresent.split(',');
    let absentIds = req.body.allAbsent.split(',');
    presentIds = presentIds.map(id => id.trim());
    absentIds = absentIds.map(id => id.trim());
    // Filtering out empty strings from the arrays
    presentIds = presentIds.filter(id => id !== '');
    absentIds = absentIds.filter(id => id !== '');
    let presentIdsLength = presentIds.length;
    let absentIdsLength = absentIds.length;
    if(presentIdsLength>0){
        for (let id of presentIds) {
            let previous="Present";
            let attendData = await Attendence.findById(id);
            techId = attendData.teacherId;
            claId = attendData.classId;
            let a = attendData.totalClass + 1;
            let b = attendData.attendenClass + 1;
            let c = ((b / a) * 100).toFixed(2);
            let saveAttendence = await Attendence.findByIdAndUpdate(id, { totalClass: a, attendenClass: b, classPercent: c, classPrevious: previous });
            let allStudGroup = await allStudent.find();
            if (allStudGroup.length > 0) {
                for (let i = 0; i < allStudGroup.length; i++) {
                    let newSub = allStudGroup[i].allAttendence;
                    if (newSub.length > 0) {
                        for (let j = 0; j < newSub.length; j++) {
                            if (newSub[j]._id.toString() === id) {
                                newSub[j].totalClass = a;
                                newSub[j].attendenClass = b;
                                newSub[j].classPercent = c;
                                newSub[j].classPrevious = previous;
                                await allStudGroup[i].save();
                            }
                        }
                    }
                }
            }
        }

    }
    if(absentIdsLength>0){
        for (let id of absentIds) {
            let previous="Absent";
            let attendData = await Attendence.findById(id);
            techId = attendData.teacherId;
            claId = attendData.classId;
            let a = attendData.totalClass + 1;
            let b = attendData.attendenClass;
            let c = ((b / a) * 100).toFixed(2);
            let saveAttendence = await Attendence.findByIdAndUpdate(id, { totalClass: a, attendenClass: b, classPercent: c, classPrevious: previous });
            let allStudGroup = await allStudent.find();
            if (allStudGroup.length > 0) {
                for (let i = 0; i < allStudGroup.length; i++) {
                    let newSub = allStudGroup[i].allAttendence;
                    if (newSub.length > 0) {
                        for (let j = 0; j < newSub.length; j++) {
                            if (newSub[j]._id.toString() === id) {
                                newSub[j].totalClass = a;
                                newSub[j].attendenClass = b;
                                newSub[j].classPercent = c;
                                newSub[j].classPrevious = previous;
                                await allStudGroup[i].save();
                            }
                        }
                    }
                }
            }
        }
    }
    req.flash("success","Attendance saved successfully.");
    res.redirect(`/Attendence-Tracker/${techId}/${claId}/Attendence-Sheet`);       
}));

module.exports=router;