document.addEventListener("DOMContentLoaded", function () {
    let percentage = document.querySelectorAll(".percentage");
    let bars = document.querySelectorAll("#barPer");
    percentage.forEach(function (element, index) {
        let width = parseInt(element.innerHTML);
        bars[index].style.width = width + "%";
        if (width >= 75) {
            bars[index].classList.remove('bg-danger');
        }
    });
});


//To hide show attendance table...
let showAttendTable = document.querySelector("#showAttendTable");
let showTable = document.querySelector("#showTable");
let graphBoxs = document.querySelector("#allGraphs");
showAttendTable.addEventListener("click", function () {
    if (showTable.style.display === "none") {
        showAttendTable.innerHTML = "Show Attendance Graph";
        showTable.style.display = "block";
        graphBoxs.style.display = "none";
    }
    else {
        showAttendTable.innerHTML = "Show Attendance Table";
        showTable.style.display = "none"
        graphBoxs.style.display = "block";
    }
})
