document.getElementById('passwordChangeForm').addEventListener('submit', function (event) {
  var newPassword = document.getElementById('newPassword').value;
  var newPasswordConf = document.getElementById('newPasswordc').value;
  if (newPassword !== newPasswordConf) {
    document.getElementById('overlay').style.display = "block";
    document.getElementById('notMatch').style.display = "block";
    event.preventDefault();
  }
});

document.getElementById('notMatchOk').addEventListener("click", function () {
  var newPassword = document.getElementById('newPassword').value = "";
  var newPasswordConf = document.getElementById('newPasswordc').value = "";
  document.getElementById('overlay').style.display = "none";
  document.getElementById('notMatch').style.display = "none";
})