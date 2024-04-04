
// Form For New Student....
let attend=document.querySelector("#attend");
let studentForm=document.querySelector(".studentForm");
let studentNew=document.querySelector(".studentNew");
let cancleForm=document.querySelector(".studCancle");
studentNew.addEventListener("click",function(){
    if(studentForm.style.display==="block"){
        studentForm.style.display="none";
        attend.style.opacity="1";
    }
    else{
        attend.style.opacity="0.2";
        studentForm.style.display="block";
    }
})
cancleForm.addEventListener("click",function(){
    if(studentForm.style.display==="block"){
        studentForm.style.display="none";
        attend.style.opacity="1";
    }
    // else{
    //     attend.style.opacity="0.2";
    //     studentForm.style.display="block";
    // }
})



// To Hide And Show Todays class....
// let todayClass = document.querySelector("#todayClass");
// let present = document.querySelectorAll(".present");
// todayClass.addEventListener("click", function() {
//     present.forEach(button => {
//         if (button.style.display === "none") {
//             button.style.display = "";
//             todayClass.innerHTML="Cancle Class";
//         } else {
//             button.style.display = "none";
//             todayClass.innerHTML="Today's Class";
//         }
//     });
// });


// To Calculate Percentage of all students...
document.addEventListener('DOMContentLoaded', function() {
    // Iterate over each student
    document.querySelectorAll('.stPer .data').forEach(perElement => {
        // Get student ID
        const studentId = perElement.dataset.studentId;

        // Get total and attended classes for the current student
        const totalClasses = parseInt(document.querySelector(`.stTotal .data[data-student-id="${studentId}"]`).textContent);
        const attendClasses = parseInt(document.querySelector(`.stAttend .data[data-student-id="${studentId}"]`).textContent);
        
        // Calculate percentage for the current student
        const percentage = (attendClasses / totalClasses) * 100;

        // Display percentage for the current student
        perElement.textContent = percentage.toFixed(2) + '%';

        if (perElement.textContent==="NaN%") {
            perElement.textContent = " ";
            // perElement.style.color = 'white';
        }
        // Change background color if percentage is less than 75%
        if (percentage < 75) {
            perElement.style.backgroundColor = 'rgb(253, 200, 208)';
            // perElement.style.color = 'white';
        }
    });
});

// Previous day value color change...
document.addEventListener('DOMContentLoaded', function() {
    // Iterate over each student
    document.querySelectorAll('.stPrev .data').forEach(prevElement => {
        // Get student ID
        const studentId = prevElement.dataset.studentId;

        // Check if the student is present
        const isPresent = prevElement.textContent.trim().toLowerCase() === 'absent';

        // Change background color if the student is present
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


//To Mark and Store Present absent data
// $(document).ready(function () {
//     var presentStudents = []; // Array to store IDs of students marked present
//     var absentStudents = []; // Array to store IDs of students marked absent

//     // When a button with class 'present' is clicked
//     $('.present').click(function () {
//         var studentId = $(this).data('student-id'); // Get the student ID from the data attribute

//         // Check if the student ID is not already in the absentStudents array
//         var index = absentStudents.indexOf(studentId);
//         if (index !== -1) {
//             absentStudents.splice(index, 1); // Remove the student ID from the absentStudents array
//         }

//         // Check if the student ID is not already in the presentStudents array
//         if (!presentStudents.includes(studentId)) {
//             presentStudents.push(studentId); // Add the student ID to the presentStudents array
//         }
//     });

//     // When a button with class 'absent' is clicked
//     $('.absent').click(function () {
//         var studentId = $(this).data('student-id'); // Get the student ID from the data attribute

//         // Check if the student ID is not already in the presentStudents array
//         var index = presentStudents.indexOf(studentId);
//         if (index !== -1) {
//             presentStudents.splice(index, 1); // Remove the student ID from the presentStudents array
//         }

//         // Check if the student ID is not already in the absentStudents array
//         if (!absentStudents.includes(studentId)) {
//             absentStudents.push(studentId); // Add the student ID to the absentStudents array
//         }
//     });

//     // When the external button is clicked
//     $('#showClickedValues').click(function () {
//         // Update the values of the form inputs
//         $('#allPresent').val(presentStudents.join(',')); // Join the present students array into a comma-separated string
//         $('#allAbsent').val(absentStudents.join(',')); // Join the absent students array into a comma-separated string

//         // Submit the form
//         $('#finalFormSubmit').submit();
//     });
// });




$(document).ready(function () {
    var presentStudents = []; // Array to store IDs of students marked present
    var absentStudents = []; // Array to store IDs of students marked absent

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

        // Submit the form
        $('#finalFormSubmit').submit();
    });

    // Initially check if any of the arrays is empty and hide/show the button accordingly
    checkArrays();
});