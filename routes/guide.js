let express=require('express');
const router=express.Router();

router.get("/userGuide",(req,res)=>{
    res.render("userGuide.ejs");
});

module.exports=router