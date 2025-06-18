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

      if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        const token = result.token;

        if (!token) {
          alert("JWT 토큰이 응답에 없습니다");
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));

        localStorage.setItem("token", token);
        localStorage.setItem("student_name", payload.name);
        localStorage.setItem("student_id", payload.sub);

        console.log("JWT:", payload);

        alert("회원가입 성공!");
        alert(`
          발급자 (iss): ${payload.iss}
          학번 (sub): ${payload.sub}
          이름 (name): ${payload.name}
          발급일: ${new Date(payload.iat * 1000).toLocaleString()}
          만료일: ${new Date(payload.exp * 1000).toLocaleString()}
        `);

        window.location.href = "http://127.0.0.1:5500/Eum로그인/login.html";
      } else {
        gi;
        throw new Error("서버 오류: " + response.status);
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("서버 요청 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  });
});
