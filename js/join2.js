document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitButton = document.querySelector(".submit-button");
  const passwordError = document.getElementById("student-id-error");
  const emailError = document.getElementById("email-error");
  const togglePw = document.getElementById("togglePw");

  submitButton.disabled = true;

  togglePw.src = "./images/eyeclose.svg";

  togglePw.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePw.src = isPassword
      ? "./images/eyeopen.svg"
      : "./images/eyeclose.svg";
  });

  function validateInputs() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const isEmailFilled = email !== "";
    const isPasswordFilled = password !== "";

    const emailValid = /^s2[0-9a-zA-Z]+$/.test(email);
    const passwordValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~?!@$])[A-Za-z\d~?!@$]{8,20}$/.test(
        password
      );

    if (isEmailFilled && !emailValid) {
      emailInput.classList.add("input-error");
      emailError.classList.add("show");
      emailError.style.opacity = "1";
    } else {
      emailInput.classList.remove("input-error");
      emailError.classList.remove("show");
      emailError.style.opacity = "0";
    }

    if (isPasswordFilled && !passwordValid) {
      passwordInput.classList.add("input-error");
      passwordError.classList.add("show");
      passwordError.style.opacity = "1";
    } else {
      passwordInput.classList.remove("input-error");
      passwordError.classList.remove("show");
      passwordError.style.opacity = "0";
    }

    submitButton.disabled = !(
      isEmailFilled &&
      emailValid &&
      isPasswordFilled &&
      passwordValid
    );
  }

  emailInput.addEventListener("input", validateInputs);
  passwordInput.addEventListener("input", validateInputs);

  validateInputs();
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
      const result = await response.json();
      // 상태코드 확인만 남기고, 응답 파싱 제거
      if (!response.ok) {
        alert(result.message); // ❗ 실패 시 메시지만 출력
        console.error("회원가입 실패:", result.message, response.status);
        throw new Error(result.message);
        // ❗ 실패 시 오류 메시지 출력
      } else {
        console.log("회원가입 성공:", result.message, response.status);
      }

      // ✅ 성공 처리
      alert(result.message); // 예: "회원가입 성공!"
      window.location.href = "https://eum-frontend.vercel.app/";
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert(
        "서버 요청 중 오류가 발생했습니다. 다시 시도해주세요",
        result.message
      );
    }
  });
});
