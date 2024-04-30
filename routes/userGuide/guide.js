let express=require('express');
const router=express.Router();
const userGuideController=require("../../controllers/userGuide/guide");

router.get("/userGuide",userGuideController.userGuide);

module.exports=router