document.addEventListener("DOMContentLoaded", function () {
  // 포토 클릭 시 파일 선택 {
  document.getElementById("photo").addEventListener("click", function () {
    document.getElementById("fileInput").click();
    //}
    //이미지 미리보기 {

    document
      .getElementById("fileInput")
      .addEventListener("change", function (e) {
        const file = e.target.files[0];
        const preview = document.getElementById("preview");
        const btn = document.getElementById("btn");

        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            preview.src = event.target.result;
            preview.style.display = "block";
          };
          btn.classList.remove("btn");
          btn.classList.add("btn-active");
          document.getElementById("btn").addEventListener("click", function () {
            document.getElementById("bt").click();
          });

          reader.readAsDataURL(file);
        } else {
          btn.classList.remove("btn-active");
          btn.classList.add("btn");
        }
      });
    //}
  });

  //글자 수 제한
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
      input1.value = input1.value.trim().slice(0, 32);
    } else {
      max1.classList.remove("max");
      max1.classList.add("max-on");
      input1.classList.remove("input-active");
    }

    // input2: 최대 192자
    if (input2.value.trim().length > 192) {
      max2.classList.remove("max-on");
      max2.classList.add("max");
      input2.value = input2.value.trim().slice(0, 192);

      input2.classList.add("input-active");
    } else {
      max2.classList.remove("max");
      max2.classList.add("max-on");

      input2.classList.remove("input-active");
    }
  }
  //인풋 입력 인지시 함수실행
  input1.addEventListener("input", checkInputs);
  input2.addEventListener("input", checkInputs);
});
