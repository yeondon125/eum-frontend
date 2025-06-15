document.addEventListener("DOMContentLoaded", function () {
  //글자 수 제한
  const input1 = document.querySelector(".lostname input"); // 습득물명 input
  const input2 = document.querySelector(".explanation textarea"); // 설명 textarea
  const max1 = document.getElementById("max1");
  const max2 = document.getElementById("max2");
  let base64Image = ""; // 변환된 base64 문자열이 들어갈 변수
  const btn = document.getElementById("btn");
  const token = localStorage.getItem("token");

  //버튼 클릭시 api 전송
  btn.addEventListener("click", function () {
    // 상태 검사 (현재 버튼이 활성화된 상태인지?)
    if (!btn.classList.contains("btn-active")) return;
    // 여기서만 API 실행
    fetch("https://gsm-eum.p-e.kr/lostitem/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lostitem_name: input1.value,
        lostitem_detail: input2.value,
        lostitem_url_image: base64Image,
        token: token,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("서버 응답 오류: " + res.status);
        }

        const text = await res.text();
        if (!text.trim()) {
          return {};
        }

        try {
          return JSON.parse(text);
        } catch (e) {
          console.warn("JSON 파싱 실패. 원시 응답:", text);
          return {};
        }
      })

      // JSON 변환된 데이터가 여기로 전달됨
      .then((data) => {
        alert("등록 성공!"); // 사용자에게 성공 알림
        console.log("서버 응답:", data); // 콘솔에 응답 데이터 출력
      })
      .catch((err) => {
        alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
        console.error("API 오류:", err);
      });
  });

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
            base64Image = event.target.result;
            preview.src = event.target.result;
            preview.style.display = "block";
            reader.onload = function (event) {
              const img = new Image();
              img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // 리사이즈 기준 설정
                let width = img.width;
                let height = img.height;
                const maxWidth = 800;
                const maxHeight = 800;

                // 비율 유지하면서 크기 제한
                if (width > maxWidth || height > maxHeight) {
                  if (width > height) {
                    height = height * (maxWidth / width);
                    width = maxWidth;
                  } else {
                    width = width * (maxHeight / height);
                    height = maxHeight;
                  }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                // 압축 품질 설정 (0.7 정도 적당)
                const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
                base64Image = compressedBase64;

                preview.src = compressedBase64;
                preview.style.display = "block";
              };
              img.src = event.target.result;
            };
          };

          // document.getElementById("btn").addEventListener("click", function () {
          //   document.getElementById("bt").click();
          // });

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
