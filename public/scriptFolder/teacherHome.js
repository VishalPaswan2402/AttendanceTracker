let createNewClass=document.querySelector("#createNewClass");
let createNewForm=document.querySelector("#formBox");
let cardLog=document.querySelector(".cardLog");
let cancleForm=document.querySelector("#cancleForm");
createNewClass.addEventListener("click",function(){
  createNewForm.style.display="block";
  cardLog.style.display="none";
})
cancleForm.addEventListener("click",function(){
  cardLog.style.display="block";
  createNewForm.style.display="none";

})

document.querySelector('.disSubmit').addEventListener('click',()=>{
  createNewForm.style.display='none';
})