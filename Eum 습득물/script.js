document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("photo").addEventListener("click", function () {
    document.getElementById("fileInput").click();
  });
});

function checkInputs() {
  const inputs = document.getElementsByClassName("input");

  let allFilled = true;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {
      allFilled = false;
      break;
    }
  }

  if (allFilled) {
    document.getElementById("btn").
  } 
}

