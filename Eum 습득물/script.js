document.addEventListener("DOMContentLoaded", function () {
  // 포토 클릭 시 파일 선택
  document.getElementById("photo").addEventListener("click", function () {
    document.getElementById("fileInput").click();
  });

  const input1 = document.querySelector(".lostname input"); // 습득물명 input
  const input2 = document.querySelector(".explanation textarea"); // 설명 textarea
  const max1 = document.getElementById("max1");
  const max2 = document.getElementById("max2");

  function checkInputs() {
    // input1: 최대 32자
    if (input1.value.trim().length > 32) {
      max1.classList.remove("max-on");
      max1.classList.add("max");
      input1.classList.add("input-active");
    } else {
      max1.classList.remove("max");
      max1.classList.add("max-on");
      input1.classList.remove("input-active");
    }

    // input2: 최대 192자
    if (input2.value.trim().length > 192) {
      max2.classList.remove("max-on");
      max2.classList.add("max");

      input2.classList.add("input-active");
    } else {
      max2.classList.remove("max");
      max2.classList.add("max-on");

      input2.classList.remove("input-active");
    }
  }
  input1.addEventListener("input", checkInputs);
  input2.addEventListener("input", checkInputs);
});

////버튼 색 바꾸기기
//const btn = document.getElementById("btn");
//   if (allFilled) {
//     btn.classList.remove("btn");
//     btn.classList.add("btn-active");
//   } else {
//     btn.classList.remove("btn-active");
//     btn.classList.add("btn");
//   }
// }

// //버튼 택스트 클릭시 함수호출
// document
//   .getElementById("btn-active")
//   .addEventListener("click", function () {});
