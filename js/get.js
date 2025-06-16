document.addEventListener("DOMContentLoaded", function () {
  let base64Image = ""; // 변환된 base64 문자열이 들어갈 변수
  const btn = document.getElementById("btn"); // 변수 선언을 위로 이동

  document.getElementById("fileInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const preview = document.getElementById("preview");

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        base64Image = event.target.result;
        preview.src = event.target.result;
        preview.style.display = "block";

        // 파일 크기 로그
        const fileSize = Math.round(file.size / 1024);
        console.log("📸 파일 크기:", fileSize, "KB");
        console.log("📸 base64 길이:", base64Image.length);

        // 버튼 활성화
        btn.classList.remove("btn");
        btn.classList.add("btn-active");
      };
      reader.readAsDataURL(file);
    } else {
      btn.classList.remove("btn-active");
      btn.classList.add("btn");
    }
  });

  //버튼 클릭시 api 전송
  const token = localStorage.getItem("token");
  btn.addEventListener("click", function () {
    // 상태 검사 (현재 버튼이 활성화된 상태인지?)
    if (!btn.classList.contains("btn-active")) return;
    // 여기서만 API 실행
    fetch("https://gsm-eum.p-e.kr/getitem/post", {
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
      .then((res) => {
        if (!res.ok) {
          // 응답 상태 코드가 200대가 아닐 경우 오류 처리
          throw new Error("서버 응답 오류: " + res.status);
        }
        // return res.json(); // 응답 데이터를 JSON 객체로 변환
      })
      // JSON 변환된 데이터가 여기로 전달됨
      .then((data) => {
        console.log("✅ 전송 성공! 서버 응답:", data);
        alert("등록 성공!"); // 사용자에게 성공 알림
        console.log("서버 응답:", data); // 콘솔에 응답 데이터 출력
      })
      .catch((err) => {
        console.error("❌ 전송 실패:", err);
        alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
        console.error("API 오류:", err);
      });
  });

  // 포토 클릭 시 파일 선택 {
  document.getElementById("photo").addEventListener("click", function () {
    document.getElementById("fileInput").click();
    //}
    //이미지 미리보기 {

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
