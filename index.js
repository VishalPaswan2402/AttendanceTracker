let express=require('express');
const app=express();
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
let port="8080";
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const mongoose = require('mongoose');
const Teacher = require('./models/teachers.js');
const allStudent = require('./models/students.js');
const newClass = require('./models/class.js');
const Attendence = require("./models/attendence.js");

mongoose.connect('mongodb://127.0.0.1:27017/Attendence')
  .then(() => console.log('Connected!'));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/Attendence-Tracker/Teacher-Login",(req,res)=>{
    res.render("tlogin.ejs");
});

app.get("/Attendence-Tracker/Teacher-SignUp",(req,res)=>{
    res.render("signup.ejs");
});


app.get("/Attendence-Tracker/Students-Login",(req,res)=>{
    res.render("login.ejs");
});

app.get("/Attendence-Tracker/userGuide",(req,res)=>{
    res.render("userGuide.ejs");
})

// Students Page...
app.get("/Attendence-Tracker/Students-Page",async(req,res)=>{
    let{sName,sRollNo,semester,section,collegeName}=req.query;
    let findStudent=await allStudent.findOne({studentName:sName,studentRollNo:sRollNo,studentSemester:semester,studentSection:section,college:collegeName});
    // console.log(findStudent);
    res.render("stPage.ejs",{findStudent});
})

// Teacher signup...
app.post("/Attendence-Tracker/Teacher-HomePage",async(req,res)=>{
    let{teacherName,teacherEmail,collegeName,subject,password}=req.body;
    let newTeacher=new Teacher({teacherName,teacherEmail,collegeName,subject,password});
    await newTeacher.save();
    // console.log(newTeacher);
    let id=newTeacher._id;
    // res.render("teacherHome.ejs",{newTeacher});
    // res.redirect("/Attendence-Tracker/Teacher-Login");
    let allClass=await newClass.find({teacherId:id});
    res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
});


// Teacher login...
app.post("/Attendence-Tracker/Teacher-HomePages",async(req,res)=>{
    let{teacherName,teacherEmail,password}=req.body;
    let newTeacher=await Teacher.findOne({teacherName:teacherName,teacherEmail:teacherEmail,password:password});
    if(newTeacher){
        let id=newTeacher._id;
        let allClass=await newClass.find({teacherId:id});
        res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
    }
    else{
        res.redirect("/Attendence-Tracker/Teacher-Login");
    }
});


// To add new class...
app.post("/Attendence-Tracker/:id/New-Class",async(req,res)=>{
    let{id}=req.params;
    let{semester,section,password}=req.body;
    let newTeacher=await Teacher.findById(id);
    // console.log(currTech.collegeName,currTech._id,currTech.password);
    let teacherId=newTeacher._id;
    let college=newTeacher.collegeName;
    let oriPass=newTeacher.password;
    let subject=newTeacher.subject;
    let findClass=await newClass.find({teacherId:teacherId,semester:semester,section:section,subject:subject,college:college});
    // console.log(findClass);
    if(findClass.length<1){
        let addClass=new newClass({teacherId,semester,section,subject,college});
        await addClass.save();
        let classId=addClass._id;
        let totalStudent=await allStudent.find({studentSemester:semester,studentSection:section,college:college});
        // console.log(totalStudent);
        if (totalStudent.length > 0) {
            for (let i = 0; i < totalStudent.length; i++) {
                let newAttendance = new Attendence({subject:subject, teacherId: teacherId, classId: classId, studentId: totalStudent[i]._id });
                await newAttendance.save();
                totalStudent[i].allAttendence.push(newAttendance);
                await totalStudent[i].save();
            }
        }
    }
    res.redirect(`/Attendence-Tracker/${id}/TeacherHome`);
});


//To add new student...
app.post("/Attendence-Tracker/:idTeacher/:idClass/New-Student",async(req,res)=>{
    let{idTeacher,idClass}=req.params;
    let{studentName,studentRollNo}=req.body;
    let currClass=await newClass.findById(idClass);
    let studentSemester=currClass.semester;
    let studentSection=currClass.section;
    let college=currClass.college;
    let classId=idClass;
    let teacherId=idTeacher;
    let newTeacher=await Teacher.findById(teacherId);
    let findStudent=await allStudent.find({studentRollNo:studentRollNo,studentSemester:studentSemester,studentSection:studentSection,college:college});
    if(findStudent.length<1){
        let newStudent= new allStudent({studentName:studentName,studentRollNo:studentRollNo,studentSemester:studentSemester,studentSection:studentSection,teacherId:teacherId,classId:classId,college:college});
        await newStudent.save();
        let studentId=newStudent._id;
        let subject=newTeacher.subject;
        let newAttendence=new Attendence({subject:subject,teacherId:teacherId,classId:classId,studentId:studentId});
        await newAttendence.save();
        newStudent.allAttendence.push(newAttendence);
        await newStudent.save();
        let allClass=await newClass.find({semester:studentSemester,section:studentSection,college:college});
        if(allClass.length>0){
            for(let i=0;i<allClass.length;i++){
                if(allClass[i].subject!=subject){
                    let addSub=allClass[i].subject;
                    let addTechId=allClass[i].teacherId.toString();
                    let addClassId=allClass[i]._id.toString();
                    let addStudId=newStudent._id.toString();
                    let addNewAttendence=new Attendence({subject:addSub,teacherId:addTechId,classId:addClassId,studentId:addStudId});
                    await addNewAttendence.save();
                    newStudent.allAttendence.push(addNewAttendence);
                    await newStudent.save();
                }
            }
        }
    }
    
    res.redirect(`/Attendence-Tracker/${idTeacher}/${idClass}/Attendence-Sheet`);
});


// Add Attendence as present...
// app.put("/Attendence-Tracker/:id/Add-Present",async(req,res)=>{
//     let{id}=req.params;
//     let previous="Present";
//     let attendData=await Attendence.findById(id);
//     let techId=attendData.teacherId;
//     let claId=attendData.classId;
//     let a=attendData.totalClass + 1;
//     let b=attendData.attendenClass + 1;
//     let c = ((b / a) * 100).toFixed(2);
//     let saveAttendence=await Attendence.findByIdAndUpdate(id,{totalClass:a,attendenClass:b,classPercent:c,classPrevious:previous});
//     let allStudGroup=await allStudent.find();
//     if(allStudGroup.length>0){
//         for(let i=0;i<allStudGroup.length;i++){
//             let newSub=allStudGroup[i].allAttendence;
//             if(newSub.length>0){
//                 for(let j=0;j<newSub.length;j++){
//                     if(newSub[j]._id.toString()===id){
//                         newSub[j].totalClass=a;
//                         newSub[j].attendenClass=b;
//                         newSub[j].classPercent=c;
//                         newSub[j].classPrevious=previous;
//                         await allStudGroup[i].save();
//                     }
//                 }
//             }
//         }
//     }
//     res.redirect(`/Attendence-Tracker/${techId}/${claId}/Attendence-Sheet`);
// })


// Add Attendence as absent...
// app.put("/Attendence-Tracker/:id/Add-Absent",async(req,res)=>{
//     let{id}=req.params;
//     let previous="Absent";
//     let attendData=await Attendence.findById(id);
//     let techId=attendData.teacherId;
//     let claId=attendData.classId;
//     let a=attendData.totalClass + 1;
//     let b=attendData.attendenClass;
//     let c = ((b / a) * 100).toFixed(2);
//     let saveAttendence=await Attendence.findByIdAndUpdate(id,{totalClass:a,attendenClass:b,classPercent:c,classPrevious:previous});
//     let allStudGroup=await allStudent.find();
//     if(allStudGroup.length>0){
//         for(let i=0;i<allStudGroup.length;i++){
//             let newSub=allStudGroup[i].allAttendence;
//             if(newSub.length>0){
//                 for(let j=0;j<newSub.length;j++){
//                     if(newSub[j]._id.toString()===id){
//                         newSub[j].totalClass=a;
//                         newSub[j].attendenClass=b;
//                         newSub[j].classPercent=c;
//                         newSub[j].classPrevious=previous;
//                         await allStudGroup[i].save();
//                     }
//                 }
//             }
//         }
//     }
//     res.redirect(`/Attendence-Tracker/${techId}/${claId}/Attendence-Sheet`);
// })


//For teacher attendence sheet...
app.get("/Attendence-Tracker/:idTeacher/:idClass/Attendence-Sheet",async(req,res)=>{
    let{idTeacher,idClass}=req.params;
    let classTech=await Teacher.findById(idTeacher);
    let allClass=await newClass.findById(idClass);
    let students=await allStudent.find({studentSemester:allClass.semester,studentSection:allClass.section,college:allClass.college});
    let studentAttendence=await Attendence.find({teacherId:idTeacher,classId:idClass}); 
    // console.log(studentAttendence);
    res.render("techPage.ejs",{classTech,students,allClass,studentAttendence});
});


// For teacher homepage...
app.get("/Attendence-Tracker/:id?/TeacherHome",async(req,res)=>{
    let{id}=req.params;
    if(id){
        let newTeacher=await Teacher.findById(id);
        let allClass=await newClass.find({teacherId:newTeacher._id});
        res.render("teacherHome.ejs",{newTeacher,allClass});
    }
});


// For marking present and absent for all students...
app.post("/Attendence-Tracker/Submit-All-Attendence", async (req, res) => {
    let techId;
    let claId;
    // try {
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
        // Respond with a success message
        res.redirect(`/Attendence-Tracker/${techId}/${claId}/Attendence-Sheet`);

    // } catch (error) {
    //     console.error("Error processing data:", error);
    //     res.status(500).send("Internal server error");
    // }
});

app.get("/Attendence-Tracker/:techId/:sub/:classId/Print-Attendence-sheet",async(req,res)=>{
    let{techId,sub,classId}=req.params;
    let totalStudents=await allStudent.find();
    // console.log(totalStudents);
    if(totalStudents.length>0){
        for(let i=0;i<totalStudents.length;i++){
            let atTotal=totalStudents[i].allAttendence;
            if(atTotal.length>0){
                for(let j=0;j<atTotal.length;j++){
                    if(atTotal[j].subject===sub && atTotal[j].teacherId===techId && atTotal[j].classId===classId){
                        console.log(atTotal[j]);
                    }
                }
            }
        }
    }
    
})


app.listen(port,()=>{
    console.log("Server is listening...")
})

