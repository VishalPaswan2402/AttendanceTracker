let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const collegeControllersforTeacher=require("../../../controllers/collegeControllers/addTeacher/searchTeacher.js");

// Search teacher...
router.get("/Search-Teacher",wrapAsync(
    collegeControllersforTeacher.searchTeacher
));
 module.exports=router;