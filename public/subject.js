let year=document.querySelector(".year");
let sem=document.querySelector(".sem");
let branch=document.querySelector(".branch");
let sub1=document.querySelector(".s1");
let subBtn=document.querySelector(".subBtn");
let hide=document.querySelector(".hide");
subBtn.addEventListener("click",()=>{
    subBtn.style.display="none";
    hide.style.display="block";
    console.log(year.innerValue);
    console.log(branch.innerValue);
    console.log(sem.innerText);
    // if((year.innerValue==1) && (sem.innerValue==1) && (branch.innerValue==CSE)){
    //     console.log("True");
    // }
    // else{
    //     console.log("False");
    // }
    
})
