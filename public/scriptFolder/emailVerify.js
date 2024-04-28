const countdownTime = 0.5; // 2 minutes
const startTime = new Date().getTime();
const countdownElement = document.getElementById('countdown');
const timerInterval = setInterval(function() {
const now = new Date().getTime();
const distance = (startTime + countdownTime * 60 * 1000) - now;
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);
countdownElement.innerHTML = `Time remaining: ${minutes}m ${seconds}s`;
    if (distance < 0) {
        clearInterval(timerInterval);
        countdownElement.innerHTML = 'Time expired!';
        countdownElement.style.color="red";
        document.getElementById('enterCode').readOnly = true;
        document.getElementById('registerButton').style.display = "none";
        document.getElementById('resendMail').style.display="block";
    }
}, 1000);

