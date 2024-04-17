// Form For New Student....
let attend=document.querySelector("#attend");
let studentForm=document.querySelector("#studentForm");
let studentNew=document.querySelector(".studentNew");
let cancleForm=document.querySelector(".studCancle");
studentNew.addEventListener("click",function(){
    if(studentForm.style.display==="block"){
        studentForm.style.display="none";
        document.getElementById("overlay").style.display = "none";
    }
    else{
        studentForm.style.display="block";
        document.getElementById("overlay").style.display = "block";
    }
})
cancleForm.addEventListener("click",function(){
    if(studentForm.style.display==="block"){
        studentForm.style.display="none";
        document.getElementById("overlay").style.display = "none";
    }
})

// Form For Delete Class....
let deleteClass=document.querySelector("#deleteClass");
let delClass=document.querySelector("#delClass");
let cancleDel=document.querySelector("#cancleDel");
delClass.addEventListener("click",function(){
    if(deleteClass.style.display==="block"){
        deleteClass.style.display="none";
        document.getElementById("overlay").style.display = "none";
    }
    else{
        deleteClass.style.display="block";
        document.getElementById("overlay").style.display = "block";
    }
})
cancleDel.addEventListener("click",function(){
    if(deleteClass.style.display==="block"){
        deleteClass.style.display="none";
        document.getElementById("overlay").style.display = "none";
    }
})

// To change background color according to percentage...
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stPer .data').forEach(perElement => {
        const percentage = parseFloat(perElement.textContent.replace('%', ''));
        if (!isNaN(percentage) && percentage < 75) {
            perElement.style.backgroundColor = 'rgb(253, 200, 208)';
        }
    });
});

// Previous day value color change...
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stPrev .data').forEach(prevElement => {
        const studentId = prevElement.dataset.studentId;
        const isPresent = prevElement.textContent.trim().toLowerCase() === 'absent';
        if (isPresent) {
            prevElement.style.backgroundColor = 'rgb(253, 200, 208)';
        }
    });
});

// Select the present absent value button
const presentButtons = document.querySelectorAll('.present');
presentButtons.forEach(button => {
    button.addEventListener('click', function() {
        const studentId = this.getAttribute('data-student-id');
        const preIdInput = document.querySelector(`input[name="preId"][data-student-id="${studentId}"]`);
        const absIdInput = document.querySelector(`input[name="absId"][data-student-id="${studentId}"]`);
        if (this.classList.contains('preP')) {
            console.log('Pre. button clicked for student ID: ' + studentId);
            preIdInput.value = studentId;
            absIdInput.value = "";
            this.style.backgroundColor = "rgb(100, 188, 100)"; // Change color for Pre. button
            // Reset color for Abs. button
            const absButton = document.querySelector(`.absA[data-student-id="${studentId}"]`);
            absButton.style.backgroundColor = "";
        } else if (this.classList.contains('absA')) {
            console.log('Abs. button clicked for student ID: ' + studentId);
            absIdInput.value = studentId;
            preIdInput.value = "";
            this.style.backgroundColor = "red"; // Change color for Abs. button
            // Reset color for Pre. button
            const preButton = document.querySelector(`.preP[data-student-id="${studentId}"]`);
            preButton.style.backgroundColor = "";
        }
    });
});

// Array to store attendence...
$(document).ready(function () {
    var presentStudents = []; // Array to store IDs of students marked present
    var absentStudents = []; // Array to store IDs of students marked absent
    var totalStudents = $('.student').length; // Total number of students
    // When a button with class 'present' is clicked
    $('.present').click(function () {
        var studentId = $(this).data('student-id'); // Get the student ID from the data attribute
        // Check if the student ID is not already in the absentStudents array
        var index = absentStudents.indexOf(studentId);
        if (index !== -1) {
            absentStudents.splice(index, 1); // Remove the student ID from the absentStudents array
        }
        // Check if the student ID is not already in the presentStudents array
        if (!presentStudents.includes(studentId)) {
            presentStudents.push(studentId); // Add the student ID to the presentStudents array
        }
        // Check if any of the arrays is empty and hide/show the button accordingly
        checkArrays();
    });
    // When a button with class 'absent' is clicked
    $('.absent').click(function () {
        var studentId = $(this).data('student-id'); // Get the student ID from the data attribute
        // Check if the student ID is not already in the presentStudents array
        var index = presentStudents.indexOf(studentId);
        if (index !== -1) {
            presentStudents.splice(index, 1); // Remove the student ID from the presentStudents array
        }
        // Check if the student ID is not already in the absentStudents array
        if (!absentStudents.includes(studentId)) {
            absentStudents.push(studentId); // Add the student ID to the absentStudents array
        }
        // Check if any of the arrays is empty and hide/show the button accordingly
        checkArrays();
    });
    // Function to check if any of the arrays is empty and hide/show the button accordingly
    function checkArrays() {
        if (presentStudents.length === 0 && absentStudents.length === 0) {
            $('#showClickedValues').hide(); // Hide the button if any of the arrays is empty
        } else {
            $('#showClickedValues').show(); // Show the button if both arrays have elements
        }
    }
    // When the external button is clicked
    $('#showClickedValues').click(function () {
        // Update the values of the form inputs
        $('#allPresent').val(presentStudents.join(',')); // Join the present students array into a comma-separated string
        $('#allAbsent').val(absentStudents.join(',')); // Join the absent students array into a comma-separated string
        // Check if the sum of present and absent students is less than the total number of students
        var totalMarkedStudents = presentStudents.length + absentStudents.length;
        // console.log(totalMarkedStudents);
        // console.log(totalStudents);
        if (totalMarkedStudents < totalStudents) {
            alert("Some students are not marked as either present or absent!");
        } else {
            // Submit the form if all students are marked
            $('#finalFormSubmit').submit();
        }
    });
    // Initially check if any of the arrays is empty and hide/show the button accordingly
    checkArrays();
});