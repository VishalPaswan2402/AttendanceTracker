let express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../../../utility/wrapAsync.js");
const expressError=require("../../../utility/expressError.js");
const collegeReg=require("../../../models/collegeReg.js");
const collegeT=require("../../../models/collegeT.js");

router.get("/Search-Teacher",async(req,res,next)=>{
    let{teacherName}=req.query;
    let{id}=req.params;
    let currCollege=await collegeReg.findById(id);
    let allTeachers=await collegeT.find({teacherName:teacherName});
    let searching="True";
    res.render("college/collegePage.ejs",{currCollege,allTeachers,searching,teacherName});
});
 module.exports=router;