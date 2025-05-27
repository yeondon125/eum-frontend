const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');
const errorMsg = document.getElementById('error-message');
const loginBtn = document.getElementById('login-btn');
const togglePw = document.getElementById('togglePw');
const passwordField = document.getElementById('password');

window.addEventListener('DOMContentLoaded', () => {
  loginBtn.disabled = true;
});

function login() {
  errorMsg.style.display = 'block';
  emailInput.classList.add('input-error');
  pwInput.classList.add('input-error');
  loginBtn.disabled = true;
}

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
