function setLoadingEffect(btn) {
  let count = 0;
  let percentage = 0;
  let interval = setInterval(() => {
    percentage += 0.3;
    btn.style.background = `linear-gradient(to right, rgb(0, 91, 227) ${percentage}%, #ccc ${percentage}%)`;
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.width = "12rem"
    btn.disabled = true;
    btn.innerText = 'Working on it...';
    if (percentage >= 100) {
      count++;
      if (count == 2) {
        clearInterval(interval);
      }
      else {
        percentage = 0;
      }
    }
  }, 10)
};

function addingEffects(subId) {
  let form_1 = document.getElementById(subId);
  let inputs = form_1.querySelectorAll('.inp1');
  let allFilled = true;
  let inputArray = Array.from(inputs);
  inputArray.map((ip) => {
    if (ip.value === "") {
      allFilled = false;
    }
  });
  if (allFilled) {
    let arr = document.querySelectorAll('.logInfo');
    if(arr){
      arrArr = Array.from(arr);
      arrArr.map((inp) => {
        inp.style.display = 'none';
      })
    }
    inputArray.map((ip) => {
      ip.readOnly = true;
    });
    setLoadingEffect(document.querySelector(`.${subId}`))
  }
};