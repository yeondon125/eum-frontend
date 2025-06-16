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

    try {
      let imageUrl = null; // 이미지 URL 변수

      // 사진이 선택된 경우에만 S3 업로드
      if (selectedFile) {
        console.log("사진 업로드 시작...");

        // 1. S3 업로드 URL 요청
        const res = await fetch("https://gsm-eum.p-e.kr/lostitem/makelink", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileType: selectedFile.type,
          }),
        });

        if (!res.ok) {
          throw new Error("S3 업로드 URL 요청 실패: " + res.status);
        }

        const { uploadUrl, fileUrl } = await res.json();

        // 2. S3에 파일 업로드
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });

        if (!uploadResponse.ok) {
          throw new Error("S3 업로드 실패: " + uploadResponse.status);
        }

        imageUrl = fileUrl; // S3 URL 저장
        console.log("✅ S3 업로드 성공:", imageUrl);
      } else {
        console.log("📸 사진 없음 - 텍스트만 등록");
      }

      // 3. 메인 API에 데이터 전송 (사진 있으면 URL, 없으면 null)
      const apiResponse = await fetch("https://gsm-eum.p-e.kr/lostitem/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lostitem_name: input1.value,
          lostitem_detail: input2.value,
          lostitem_url_image: imageUrl, // 사진이 있으면 URL, 없으면 null
          token: token,
        }),
      });

      if (!apiResponse.ok) {
        throw new Error("API 요청 실패: " + apiResponse.status);
      }

      const data = await apiResponse.json();
      console.log("✅ API 요청 성공:", data);
      alert("등록 성공!");

      // 성공 후 페이지 이동
      window.location.href = "https://eum-frontend.vercel.app/main.html";
    } catch (error) {
      console.error("❌ 오류 발생:", error);
      alert("처리 중 오류가 발생했습니다: " + error.message);
    }
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
          // 파일이 선택되지 않았을 때는 버튼 상태를 변경하지 않음
          // (텍스트 입력으로도 등록 가능하므로)
          preview.style.display = "none";
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
