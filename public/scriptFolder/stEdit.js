let remSt=document.querySelector("#removeStudent");
let delForm=document.querySelector("#deleteForm");
let box=document.querySelector("#editBox");
remSt.addEventListener("click",function(){
    if(delForm.style.display==="block"){
        delForm.style.display="none";
        box.style.display="block"
    }
    else{
        delForm.style.display="block";
        box.style.display="none";
    }
})