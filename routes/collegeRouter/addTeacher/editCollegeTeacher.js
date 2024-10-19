let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const{isCollLoggedIn, isCollegeOwner}=require('../../../middlewares/authenticateCollege.js')
const collegeControllersforTeacher=require("../../../controllers/collegeControllers/addTeacher/editCollegeTeacher.js");

// Edit college teacher form...
router.get("/Edit-Teacher",isCollLoggedIn,isCollegeOwner,wrapAsync(
    collegeControllersforTeacher.editTeacherPage
));

// Edit college teacher...
router.put("/Edit-Teacher-Data",isCollLoggedIn,isCollegeOwner,wrapAsync(
    collegeControllersforTeacher.editTeacherForm
));

// Delete college teacher...
router.delete("/collegeTeacher-Destroy",isCollLoggedIn,isCollegeOwner,wrapAsync(
    collegeControllersforTeacher.destroyTeacher
));

module.exports=router;