document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('username');
  const passwordInput = document.getElementById('student-id');
  const submitButton = document.querySelector('.submit-button');
  const passwordError = document.getElementById('student-id-error');
  const emailError = document.getElementById('email-error');
  const togglePw = document.getElementById('togglePw');

  submitButton.disabled = true;

  togglePw.src = 'eyeclose.svg';

  togglePw.addEventListener('click', function () {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePw.src = isPassword ? 'eyeopen.svg' : 'eyeclose.svg';
  });

  function validateInputs() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const isEmailFilled = email !== '';
    const isPasswordFilled = password !== '';

    const passwordValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~?!@$])[A-Za-z\d~?!@$]{8,20}$/.test(
        password
      );

    const emailValid = /^s2[0-9a-zA-Z]+$/.test(email);

    if (isEmailFilled && !emailValid) {
      emailInput.classList.add('input-error');
      emailError.classList.add('show');
      emailError.style.opacity = '1';
    } else {
      emailInput.classList.remove('input-error');
      emailError.classList.remove('show');
      emailError.style.opacity = '0';
    }

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
      emailValid &&
      isPasswordFilled &&
      passwordValid
    );
  }

  emailInput.addEventListener('input', validateInputs);
  passwordInput.addEventListener('input', validateInputs);

  // ✅ 이메일/비밀번호 백엔드 전송 + JWT 토큰 저장
  submitButton.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      const response = await fetch('https://example.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('서버 오류');
      }

      const result = await response.json();
      const token = result.token;

      if (!token) {
        alert('❌ JWT 토큰이 응답에 없어요!');
        return;
      }

      // ✅ localStorage에 저장
      localStorage.setItem('token', token);

      // ✅ JWT 디코딩
      const payload = JSON.parse(atob(token.split('.')[1]));

      console.log('🎫 디코딩된 JWT:', payload);

      alert(`
✅ 회원가입 완료 & 토큰 저장됨!
📌 발급자 (iss): ${payload.iss}
🆔 학번 (sub): ${payload.sub}
🙋 이름 (name): ${payload.name}
⏰ 발급일: ${new Date(payload.iat * 1000).toLocaleString()}
⌛ 만료일: ${new Date(payload.exp * 1000).toLocaleString()}
      `);

      window.location.href = 'next.html';
    } catch (error) {
      console.error('❌ 회원가입 실패:', error);
      alert('서버 요청 중 오류가 발생했어요. 다시 시도해주세요!');
    }
  });
});
