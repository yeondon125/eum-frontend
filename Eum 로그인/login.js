function login() {
  const id = document.getElementById('email').value;
  const pw = document.getElementById('password').value;

  if (!id && !pw) {
    alert('아이디와 비밀번호를 입력해주세요!');
  } else if (!id) {
    alert('아이디를 입력해주세요!');
  } else if (!pw) {
    alert('비밀번호를 입력해주세요!');
  } else {
    alert('로그인 성공!');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const pwInput = document.getElementById('password');
  const toggleBtn = document.getElementById('togglePw');

  toggleBtn.addEventListener('click', () => {
    const isHidden = pwInput.type === 'password';
    pwInput.type = isHidden ? 'text' : 'password';

    toggleBtn.classList.toggle('fa-eye');
    toggleBtn.classList.toggle('fa-eye-slash');
  });
});
