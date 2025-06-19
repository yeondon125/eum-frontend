submitButton.addEventListener("click", async () => {
  const name = localStorage.getItem("student_name");
  const studentId = localStorage.getItem("student_id");
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const response = await fetch("https://gsm-eum.p-e.kr/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_name: name,
        student_id: studentId,
        email: `${email}@gsm.hs.kr`,
        password: password,
      }),
    });

    // 상태코드 확인만 남기고, 응답 파싱 제거
    if (!response.ok) {
      throw new Error("회원가입 실패: " + response.status);
    }

    // ✅ 성공 처리
    alert("회원가입 성공!");
    window.location.href = "http://127.0.0.1:5500/Eum로그인/login.html";
  } catch (error) {
    console.error("회원가입 실패:", error);
    alert("서버 요청 중 오류가 발생했습니다. 다시 시도해주세요");
  }
});
