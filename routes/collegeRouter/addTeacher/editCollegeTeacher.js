let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const collegeControllersforTeacher=require("../../../controllers/collegeControllers/addTeacher/editCollegeTeacher.js");

// Edit college teacher form...
router.get("/Edit-Teacher",wrapAsync(
    collegeControllersforTeacher.editTeacherPage
));

// Edit college teacher...
router.put("/Edit-Teacher-Data",wrapAsync(
    collegeControllersforTeacher.editTeacherForm
));

// Delete college teacher...
router.delete("/collegeTeacher-Destroy",wrapAsync(
    collegeControllersforTeacher.destroyTeacher
));

module.exports=router;