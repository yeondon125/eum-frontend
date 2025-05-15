const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');
const errorMsg = document.getElementById('error-message');
const loginBtn = document.getElementById('login-btn');
const togglePw = document.getElementById('togglePw');
const passwordField = document.getElementById('password');

// 🔒 페이지 로딩 시 버튼 비활성화
window.addEventListener('DOMContentLoaded', () => {
  loginBtn.disabled = true;
});

// ✅ 로그인 함수: 백엔드 없으니까 무조건 실패 처리
function login() {
  errorMsg.style.display = 'block';
  emailInput.classList.add('input-error');
  pwInput.classList.add('input-error');
  loginBtn.disabled = true;
}

// 👁️‍🗨️ 비밀번호 보이기/숨기기
togglePw.addEventListener('click', function () {
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    togglePw.classList.remove('fa-eye');
    togglePw.classList.add('fa-eye-slash');
  } else {
    passwordField.type = 'password';
    togglePw.classList.remove('fa-eye-slash');
    togglePw.classList.add('fa-eye');
  }
});

// 🔁 입력할 때마다 에러 지우고 버튼 상태 업데이트
emailInput.addEventListener('input', checkInputs);
pwInput.addEventListener('input', checkInputs);

function checkInputs() {
  const emailFilled = emailInput.value.trim() !== '';
  const pwFilled = pwInput.value.trim() !== '';

  if (emailFilled && pwFilled) {
    loginBtn.disabled = false;
    errorMsg.style.display = 'none';
    emailInput.classList.remove('input-error');
    pwInput.classList.remove('input-error');
  } else {
    loginBtn.disabled = true;
  }
}
