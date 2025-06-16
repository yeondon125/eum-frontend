document.addEventListener("DOMContentLoaded", function () {
  //글자 수 제한
  const input1 = document.querySelector(".lostname input"); // 습득물명 input
  const input2 = document.querySelector(".explanation textarea"); // 설명 textarea
  const max1 = document.getElementById("max1");
  const max2 = document.getElementById("max2");
  let selectedFile = null;
  const btn = document.getElementById("btn");
  const token = localStorage.getItem("token");

  //버튼 클릭시 api 전송
  btn.addEventListener("click", async function () {
    // 상태 검사 (현재 버튼이 활성화된 상태인지?)
    if (!btn.classList.contains("btn-active")) return;

    // const res = await fetch("", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     fileName: selectedFile.name,
    //     fileType: selectedFile.type,
    //   }),
    // });
    // const { uploadUrl, fileUrl } = await res.json();
    // await fetch(uploadUrl, {
    //   method: "PUT",
    //   headers: { "Content-Type": selectedFile.type },
    //   body: selectedFile,
    // });

    // 여기서만 API 실행
    fetch("https://gsm-eum.p-e.kr/lostitem/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lostitem_name: input1.value,
        lostitem_detail: input2.value,
        lostitem_url_image: selectedFile,
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
        // 성공 후에만 페이지 이동
        window.location.href = "https://eum-frontend.vercel.app/main.html";
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
        selectedFile = file;
        const preview = document.getElementById("preview");
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            preview.src = event.target.result;
            preview.style.display = "block";
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
