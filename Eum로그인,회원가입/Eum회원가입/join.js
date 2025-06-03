document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById('username');
  const studentIdInput = document.getElementById('student-id');
  const submitButton = document.querySelector('.submit-button');
  const studentIdError = document.getElementById('student-id-error');

  submitButton.disabled = true;

  function validateInputs() {
    const name = nameInput.value.trim();
    const studentId = studentIdInput.value.trim();

    const isNameFilled = name !== '';
    const isStudentIdFilled = studentId !== '';
    const isStudentIdValid = /^\d{4}$/.test(studentId);

    if (isStudentIdFilled && !isStudentIdValid) {
      studentIdInput.classList.add('input-error');
      studentIdError.textContent = '올바른 학번을 입력해주세요(4자리)';
      studentIdError.style.opacity = '1';
    } else {
      studentIdInput.classList.remove('input-error');
      studentIdError.textContent = '';
      studentIdError.style.opacity = '0';
    }

    submitButton.disabled = !(isNameFilled && isStudentIdValid);
  }

  nameInput.addEventListener('input', validateInputs);
  studentIdInput.addEventListener('input', validateInputs);

  submitButton.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const studentId = studentIdInput.value.trim();

    try {
      const response = await fetch('https://yourapp.mockapi.io/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, studentId }),
      });

      const data = await response.json();
      const token = data.token;

      if (!token) {
        alert(' 토큰이 응답에 없습니다. 서버 응답을 확인해주세요');
        return;
      }

      // JWT 디코딩
      const payload = JSON.parse(atob(token.split('.')[1]));

      console.log('JWT:', payload);

      alert(`

      발급자 (iss): ${payload.iss}
      학번 (sub): ${payload.sub}
      이름 (name): ${payload.name}
      발급일: ${new Date(payload.iat * 1000).toLocaleString()}
      만료일: ${new Date(payload.exp * 1000).toLocaleString()}
      `);

      window.location.href =
        'http://127.0.0.1:5500/Eum%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%852/join2.html';
    } catch (error) {
      console.error('요청 실패:', error);
      alert('서버 요청 중 문제가 발생했습니다. 다시 시도해주세요');
    }
  });
});
