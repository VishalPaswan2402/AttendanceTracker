let sureDel = document.querySelector("#sureDel");
let cardDel = document.querySelector("#cardDel");
let deleteAcc = document.querySelector("#formBox1");
let confirmMe = document.querySelector("#confirmMe");
let cancleMe = document.querySelector("#cancleMe");
sureDel.addEventListener("click", function () {
  if (cardDel.style.display === "block") {
    cardDel.style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
  else {
    cardDel.style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }
})
cancleMe.addEventListener("click", function () {
  if (cardDel.style.display === "block") {
    cardDel.style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
})
confirmMe.addEventListener("click", function () {
  deleteAcc.submit();
})