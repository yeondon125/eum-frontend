// document.addEventListener("DOMContentLoaded", function () {
//   let base64Image = ""; // 변환된 base64 문자열이 들어갈 변수
//   const btn = document.getElementById("btn"); // 변수 선언을 위로 이동

//   document.getElementById("fileInput").addEventListener("change", function (e) {
//     const file = e.target.files[0];
//     const preview = document.getElementById("preview");

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function (event) {
//         base64Image = event.target.result;
//         preview.src = event.target.result;
//         preview.style.display = "block";

//         // 버튼 활성화
//         btn.classList.remove("btn");
//         btn.classList.add("btn-active");
//       };
//       reader.readAsDataURL(file);
//     } else {
//       btn.classList.remove("btn-active");
//       btn.classList.add("btn");
//     }
//   });

//   //버튼 클릭시 api 전송
//   const token = localStorage.getItem("token");
//   // 여기서만 API 실행

//   btn.addEventListener("click", async function () {
//     if (!btn.classList.contains("btn-active")) return;

//     try {
//       let imageUrl = "";

//       if (selectedFile) {
//         // 1. S3 업로드 URL 요청
//         const res = await fetch("https://gsm-eum.p-e.kr/lostitem/makelink", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fileType: selectedFile.type }),
//         });

//         if (!res.ok) throw new Error("S3 URL 요청 실패");

//         const { madeUrl, fileUrl } = await res.json();

//         // 2. 실제 파일 PUT 요청
//         const uploadRes = await fetch(madeUrl, {
//           method: "PUT",
//           headers: { "Content-Type": selectedFile.type },
//           body: selectedFile,
//         });

//         if (!uploadRes.ok) throw new Error("S3 업로드 실패");

//         imageUrl = fileUrl;
//         console.log("✅ S3 업로드 성공:", imageUrl);
//       } else {
//         console.log("📸 사진 없음 - 텍스트만 등록");
//       }

//       // 3. 메인 API 전송
//       const apiRes = await fetch("https://gsm-eum.p-e.kr/getitem/post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           getitem_name: input1.value.trim(),
//           getitem_detail: input2.value.trim(),
//           getitem_url_image: imageUrl,
//           token: token,
//         }),
//       });

//       if (!apiRes.ok) throw new Error("API 전송 실패");

//       const text = await apiRes.text(); // 먼저 텍스트로 읽음
//       let data = {};
//       if (text.trim()) {
//         try {
//           data = JSON.parse(text); // JSON 파싱 시도
//         } catch (e) {
//           console.warn("⚠️ JSON 파싱 실패:", text);
//         }
//       } else {
//         console.log("ℹ️ 응답이 비어 있습니다 (204 No Content 등)");
//       }
//       console.log("✅ 등록 성공:", data);
//       alert("등록 성공!");
//       window.location.href = "https://eum-frontend.vercel.app/main.html";
//     } catch (err) {
//       console.error("❌ 오류:", err);
//       alert("처리 중 오류 발생: " + err.message);
//     }
//   });

//   // 포토 클릭 시 파일 선택 {
//   document.getElementById("photo").addEventListener("click", function () {
//     document.getElementById("fileInput").click();
//     //}
//     //이미지 미리보기 {

//     //}
//   });

//   //글자 수 제한
//   const input1 = document.querySelector(".lostname input"); // 습득물명 input
//   const input2 = document.querySelector(".explanation textarea"); // 설명 textarea
//   const max1 = document.getElementById("max1");
//   const max2 = document.getElementById("max2");

//   function checkInputs() {
//     // input1: 최대 32자
//     if (input1.value.trim().length > 32) {
//       max1.classList.remove("max-on");
//       max1.classList.add("max");
//       input1.classList.add("input-active");
//       input1.value = input1.value.trim().slice(0, 32);
//     } else {
//       max1.classList.remove("max");
//       max1.classList.add("max-on");
//       input1.classList.remove("input-active");
//     }

//     // input2: 최대 192자
//     if (input2.value.trim().length > 192) {
//       max2.classList.remove("max-on");
//       max2.classList.add("max");
//       input2.value = input2.value.trim().slice(0, 192);

//       input2.classList.add("input-active");
//     } else {
//       max2.classList.remove("max");
//       max2.classList.add("max-on");

//       input2.classList.remove("input-active");
//     }
//   }
//   //인풋 입력 인지시 함수실행
//   input1.addEventListener("input", checkInputs);
//   input2.addEventListener("input", checkInputs);
// });

document.addEventListener("DOMContentLoaded", function () {
  const input1 = document.querySelector(".lostname input");
  const input2 = document.querySelector(".explanation textarea");
  const max1 = document.getElementById("max1");
  const max2 = document.getElementById("max2");
  const btn = document.getElementById("btn");
  const photo = document.getElementById("photo");
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");
  const token = localStorage.getItem("token");

  let selectedFile = null;
  let base64Image = null;

  // ✅ 입력 조건 검사
  function checkInputs() {
    const name = input1.value.trim();
    const detail = input2.value.trim();
    let valid = true;

    // 이름 제한
    if (name.length > 32) {
      input1.value = name.slice(0, 32);
      input1.classList.add("input-active");
      max1.classList.replace("max-on", "max");
      valid = false;
    } else {
      input1.classList.remove("input-active");
      max1.classList.replace("max", "max-on");
    }

    // 설명 제한
    if (detail.length > 192) {
      input2.value = detail.slice(0, 192);
      input2.classList.add("input-active");
      max2.classList.replace("max-on", "max");
      valid = false;
    } else {
      input2.classList.remove("input-active");
      max2.classList.replace("max", "max-on");
    }

    // 버튼 활성화 여부
    if (name.length <= 32 && detail.length <= 192 && selectedFile) {
      btn.classList.replace("btn", "btn-active");
    } else {
      btn.classList.replace("btn-active", "btn");
    }
  }

  // ✅ 이미지 선택 및 base64 미리보기
  photo.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      selectedFile = file;

      const reader = new FileReader();
      reader.onload = function (event) {
        base64Image = event.target.result;
        preview.src = base64Image;
        preview.style.display = "block";
      };
      checkInput();
      reader.readAsDataURL(file);
    }
  });

  // ✅ POST 요청 처리 (S3 업로드 → 서버 전송)
  btn.addEventListener("click", async function () {
    if (!btn.classList.contains("btn-active")) return;

    try {
      let imageUrl = "";

      if (selectedFile) {
        // 1. S3 업로드 URL 요청
        const res = await fetch("https://gsm-eum.p-e.kr/getitem/makelink", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileType: selectedFile.type }),
        });

        if (!res.ok) throw new Error("S3 URL 요청 실패");

        const { madeUrl, fileUrl } = await res.json();

        // 2. 실제 파일 PUT 요청
        const uploadRes = await fetch(madeUrl, {
          method: "PUT",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });

        if (!uploadRes.ok) throw new Error("S3 업로드 실패");

        imageUrl = fileUrl;
        console.log("✅ S3 업로드 성공:", imageUrl);
      } else {
        console.log("📸 사진 없음 - 텍스트만 등록");
      }

      // 3. 메인 API 전송
      const apiRes = await fetch("https://gsm-eum.p-e.kr/getitem/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          getitem_name: input1.value.trim(),
          getitem_detail: input2.value.trim(),
          getitem_url_image: imageUrl,
          token: token,
        }),
      });

      if (!apiRes.ok) throw new Error("API 전송 실패");

      const text = await apiRes.text(); // 먼저 텍스트로 읽음
      let data = {};
      if (text.trim()) {
        try {
          data = JSON.parse(text); // JSON 파싱 시도
        } catch (e) {
          console.warn("⚠️ JSON 파싱 실패:", text);
        }
      } else {
        console.log("ℹ️ 응답이 비어 있습니다 (204 No Content 등)");
      }
      console.log("✅ 등록 성공:", data);
      alert("등록 성공!");
      window.location.href = "https://eum-frontend.vercel.app/main.html";
    } catch (err) {
      console.error("❌ 오류:", err);
      alert("처리 중 오류 발생: " + err.message);
    }
  });

  // ✅ 입력 감지
  input1.addEventListener("input", checkInputs);
  input2.addEventListener("input", checkInputs);
});
