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

    // 로딩 상태 표시
    btn.disabled = true;
    btn.textContent = "전송 중...";

    // 전송할 데이터 크기 확인
    const dataToSend = {
      lostitem_name: input1.value,
      lostitem_detail: input2.value,
      lostitem_url_image: base64Image,
      token: token,
    };

    const jsonData = JSON.stringify(dataToSend);
    const dataSize = Math.round(jsonData.length / 1024);

    console.log("📤 전송할 데이터 크기:", dataSize, "KB");
    console.log(
      "📤 이미지 크기:",
      Math.round((base64Image.length * 3) / 4 / 1024),
      "KB"
    );

    // 여기서만 API 실행
    fetch("https://gsm-eum.p-e.kr/lostitem/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then(async (res) => {
        console.log("📡 서버 응답 상태:", res.status, res.statusText);

        if (!res.ok) {
          throw new Error("서버 응답 오류: " + res.status);
        }

        const text = await res.text();
        console.log("📡 서버 응답 텍스트:", text);

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
        console.log("✅ 전송 성공! 서버 응답:", data);
        alert("등록 성공!"); // 사용자에게 성공 알림
      })
      .catch((err) => {
        console.error("❌ 전송 실패:", err);
        alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
      })
      .finally(() => {
        // 로딩 상태 해제
        btn.disabled = false;
        btn.textContent = "등록";
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
          // 파일 크기 체크 (5MB 제한)
          if (file.size > 5 * 1024 * 1024) {
            alert(
              "파일 크기가 5MB를 초과합니다. 더 작은 이미지를 선택해주세요."
            );
            return;
          }

          const reader = new FileReader();
          reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              // 리사이즈 기준 설정 (더 작게 조정)
              let width = img.width;
              let height = img.height;
              const maxWidth = 600; // 800 -> 600으로 줄임
              const maxHeight = 600; // 800 -> 600으로 줄임

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

              // 압축 품질을 더 낮게 설정 (0.5로 줄임)
              const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5);
              base64Image = compressedBase64;

              preview.src = compressedBase64;
              preview.style.display = "block";

              // 압축 결과 로그
              const originalSize = Math.round(file.size / 1024);
              const compressedSize = Math.round(
                (base64Image.length * 3) / 4 / 1024
              );
              const compressionRatio = Math.round(
                (1 - compressedSize / originalSize) * 100
              );

              console.log("📸 원본 파일 크기:", originalSize, "KB");
              console.log("📸 압축 후 크기:", compressedSize, "KB");
              console.log("📸 압축률:", compressionRatio + "%");
              console.log("📸 base64 길이:", base64Image.length);

              // 사용자에게 압축 결과 알림
              if (compressedSize > 500) {
                // 500KB 이상이면 경고
                alert(
                  `이미지가 압축되었습니다.\n원본: ${originalSize}KB → 압축: ${compressedSize}KB\n압축률: ${compressionRatio}%`
                );
              }
            };
            img.src = event.target.result;
          };
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
