document.addEventListener("DOMContentLoaded", function() {
    function barHeight(element) {
        element.style.height = `${element.innerHTML}%`;
    }
    function changeColor(element, val) {
        if (val < 75) {
            element.style.backgroundColor = 'red';
        }
    }
    function changeColorWithDelay(element, color, delay) {
        setTimeout(() => {
            element.style.color = color;
        }, delay);
    }
    // Select all bar elements
    var bars = document.querySelectorAll(".bar");
    // Iterate through each bar element
    bars.forEach(function(bar) {
        // Get the class percent value from the bar's innerHTML
        var classPercent = parseInt(bar.innerHTML);
        // Set the height of the bar
        barHeight(bar);
        // Change color based on value
        changeColor(bar, classPercent);
        // Change color with delay
        changeColorWithDelay(bar, 'white', 2050);
    });
});