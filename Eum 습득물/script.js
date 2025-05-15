document.addEventListener("DOMContentLoaded", function () {
  //포토를 클릭시 파일을 선택할 수 있도록 설정
  document.getElementById("photo").addEventListener("click", function () {
    document.getElementById("fileInput").click();
  });
  //버튼 택스트 클릭시 함수호출출
  document.getElementById("btn-active").addEventListener("click", function () {
    document.getElementById("start").click();
  });
  document
    .getElementById("start")
    .click()
    .addEventListener("click", function () {});

  //input값 검사와 버튼 디자인 변경경
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
