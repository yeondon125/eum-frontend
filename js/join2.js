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

    if (!response.ok) {
      throw new Error("회원가입 실패: " + response.status);
    }

    const text = await response.text();
    let result = {};

    if (text.trim().startsWith("{")) {
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.warn("⚠ JSON 파싱 실패:", text);
      }
    } else {
      console.warn("⚠ 서버가 JSON 아닌 문자열을 반환:", text);
    }

    const token = result.token;
    if (!token) {
      alert("JWT 토큰이 응답에 없습니다.");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    localStorage.setItem("token", token);
    localStorage.setItem("student_name", payload.name);
    localStorage.setItem("student_id", payload.sub);

    alert("회원가입 성공!");
    window.location.href = "http://127.0.0.1:5500/Eum로그인/login.html";
  } catch (error) {
    console.error("회원가입 실패:", error);
    alert("서버 요청 중 오류가 발생했습니다. 다시 시도해주세요");
  }
});
