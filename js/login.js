const emailInput = document.getElementById("email");
const pwInput = document.getElementById("password");
const errorMsg = document.getElementById("error-message");
const loginBtn = document.getElementById("login-btn");
const togglePw = document.getElementById("togglePw");
const passwordField = document.getElementById("password");

window.addEventListener("DOMContentLoaded", () => {
  loginBtn.disabled = true;
});

togglePw.addEventListener("click", function () {
  const isHidden = passwordField.type === "password";

  passwordField.type = isHidden ? "text" : "password";
  togglePw.src = isHidden ? "./images/eyeopen.svg" : "./images/eyeclose.svg";
});

emailInput.addEventListener("input", checkInputs);
pwInput.addEventListener("input", checkInputs);

function checkInputs() {
  const emailFilled = emailInput.value.trim() !== "";
  const pwFilled = pwInput.value.trim() !== "";

  if (emailFilled && pwFilled) {
    loginBtn.disabled = false;
    errorMsg.style.display = "none";
    emailInput.classList.remove("input-error");
    pwInput.classList.remove("input-error");
  } else {
    loginBtn.disabled = true;
  }
}

function login(event) {
  event.preventDefault();

  const email = emailInput.value.trim() + "@gsm.hs.kr";
  const password = pwInput.value.trim();

  fetch("https://gsm-eum.p-e.kr/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "로그인 실패");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("로그인 성공:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.name) {
        localStorage.setItem("student_name", data.name);
      }

      location.href = "/main.html";
    })
    .catch((error) => {
      console.error("에러:", error);
      errorMsg.style.display = "block";
      errorMsg.innerText = error.message;
      emailInput.classList.add("input-error");
      pwInput.classList.add("input-error");
      loginBtn.disabled = true;
    });
}
