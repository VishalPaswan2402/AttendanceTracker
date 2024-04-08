let express=require('express');
const router=express.Router();

router.get("/userGuide",(req,res)=>{
    // console.dir(req.cookies);
    res.render("userGuide.ejs");
});

module.exports=router