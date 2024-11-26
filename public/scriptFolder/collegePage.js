let newTech = document.querySelector("#addTeacher");
let techForm = document.querySelector("#teacherForm");
let overlay = document.querySelector("#overlay");
let techData = document.querySelector("#teacherData");
let cancleForm = document.querySelector("#cancleForm");
newTech.addEventListener("click", function () {
    techForm.style.display = "block";
    overlay.style.display = "block";
});
cancleForm.addEventListener("click", function () {
    techForm.style.display = "none";
    overlay.style.display = "none";
});
