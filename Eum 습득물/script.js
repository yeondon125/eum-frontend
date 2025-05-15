document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("photo").addEventListener("click", function () {
    document.getElementById("fileInput").click();
  });

  const inputs = document.getElementsByClassName("input");
  const btn = document.getElementById("btn");

  function checkInputs() {
    let allFilled = true;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        allFilled = false;
        break;
      }
    }

    if (allFilled) {
      btn.classList.remove("btn");
      btn.classList.add("btn-active");
    } else {
      btn.classList.remove("btn-active");
      btn.classList.add("btn");
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", checkInputs);
  }

  checkInputs();
});
