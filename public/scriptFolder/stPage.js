
document.addEventListener("DOMContentLoaded", function() {
    let percentage = document.querySelectorAll(".percentage");
    let bars = document.querySelectorAll("#barPer");
    
     // Iterate over each .mno element and corresponding #def progress bar
    percentage.forEach(function(element, index) {
        let width = parseInt(element.innerHTML); // Extract width value from .mno innerHTML
        bars[index].style.width = width + "%"; // Set width of corresponding #def progress bar
    
        // Check if the percentage is greater than 75 and remove bg-danger class accordingly
        if (width >=75) {
                bars[index].classList.remove('bg-danger');
        }
    });
});    



let barGraph = document.querySelectorAll("#barPer");
barGraph.forEach(bar => {
    if (parseInt(bar.innerText) < 10) {
        bar.style.fontSize = "0.8rem";
    }
});