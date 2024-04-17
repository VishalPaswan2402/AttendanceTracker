document.addEventListener("DOMContentLoaded", function() {
    let percentage = document.querySelectorAll(".percentage");
    let bars = document.querySelectorAll("#barPer");
    percentage.forEach(function(element, index) {
        let width = parseInt(element.innerHTML); 
        bars[index].style.width = width + "%"; 
        if (width >=75) {
            bars[index].classList.remove('bg-danger');
        }
    });
});    