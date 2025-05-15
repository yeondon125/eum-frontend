document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('username');
  const passwordInput = document.getElementById('student-id');
  const submitButton = document.querySelector('.submit-button');
  const passwordError = document.getElementById('student-id-error');

  // 처음에 버튼 비활성화
  submitButton.disabled = true;

  function validateInputs() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const isEmailFilled = email !== '';
    const isPasswordFilled = password !== '';

    const passwordValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~?!@$])[A-Za-z\d~?!@$]{8,20}$/.test(
        password
      );

    if (isPasswordFilled && !passwordValid) {
      passwordInput.classList.add('input-error');
      passwordError.classList.add('show');
      passwordError.style.opacity = '1';
    } else {
      passwordInput.classList.remove('input-error');
      passwordError.classList.remove('show');
      passwordError.style.opacity = '0';
    }

    submitButton.disabled = !(
      isEmailFilled &&
      isPasswordFilled &&
      passwordValid
    );
  }

  emailInput.addEventListener('input', validateInputs);
  passwordInput.addEventListener('input', validateInputs);
});

// 👁️ 비밀번호 보이기/숨기기 기능
document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('student-id');
  const togglePw = document.getElementById('togglePw');

  togglePw.addEventListener('click', function () {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';

    togglePw.classList.toggle('fa-eye');
    togglePw.classList.toggle('fa-eye-slash');
  });
});
