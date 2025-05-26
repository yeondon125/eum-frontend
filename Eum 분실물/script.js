document.addEventListener("DOMContentLoaded", function () {
  //글자 수 제한
  const input1 = document.querySelector(".lostname input"); // 습득물명 input
  const input2 = document.querySelector(".explanation textarea"); // 설명 textarea
  const max1 = document.getElementById("max1");
  const max2 = document.getElementById("max2");

  const btn = document.getElementById("btn");

  // //버튼 클릭시 api 전송
  // btn.addEventListener("click", function () {
  //   // 상태 검사 (현재 버튼이 활성화된 상태인지?)
  //   if (!btn.classList.contains("btn-active")) return;

  //   // 여기서만 API 실행
  //   fetch("개쩌는 백엔드 url", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       lostitem_name: input1.value,
  //       lostitem_detail: input2.value,
  //       url_image: url,
  //     }),
  //   }).catch((err) => {
  //     alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
  //     console.error("API 오류:", err);
  //   });
  // });

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
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            preview.src = event.target.result;
            preview.style.display = "block";
          };

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

  function checkInputs() {
    // input1: 최대 32자
    if (input1.value.trim().length >= 1 && input1.value.trim().length < 32) {
      btn.classList.remove("btn");
      btn.classList.add("btn-active");
    } else if (input1.value.trim().length > 32) {
      max1.classList.remove("max-on");
      max1.classList.add("max");
      input1.classList.add("input-active");
      input1.value = input1.value.trim().slice(0, 32);
      btn.classList.remove("btn-active");
      btn.classList.add("btn");
    } else {
      max1.classList.remove("max");
      max1.classList.add("max-on");
      input1.classList.remove("input-active");
      btn.classList.remove("btn-active");
      btn.classList.add("btn");
    }

    // input2: 최대 192자
    if (input2.value.trim().length > 192) {
      max2.classList.remove("max-on");
      max2.classList.add("max");
      input2.value = input2.value.trim().slice(0, 192);
      input2.classList.add("input-active");
      btn.classList.remove("btn-active");
      btn.classList.add("btn");
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
