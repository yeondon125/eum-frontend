document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById('student_name');
  const studentIdInput = document.getElementById('student_id');
  const submitButton = document.querySelector('.submit-button');
  const studentIdError = document.getElementById('student-id-error');

  submitButton.disabled = true;

  // 입력 유효성 검사 함수
  function validateInputs() {
    const name = nameInput.value.trim();
    const studentId = studentIdInput.value.trim();

    const isNameFilled = name !== '';
    const isStudentIdFilled = studentId !== '';
    const isStudentIdValid = /^\d{4}$/.test(studentId); // 숫자 4자리

    // 학번 형식 오류 표시
    if (isStudentIdFilled && !isStudentIdValid) {
      studentIdInput.classList.add('input-error');
      studentIdError.textContent = '올바른 학번을 입력해주세요(4자리)';
      studentIdError.style.opacity = '1';
    } else {
      studentIdInput.classList.remove('input-error');
      studentIdError.textContent = '';
      studentIdError.style.opacity = '0';
    }

    // 버튼 활성화 조건
    submitButton.disabled = !(isNameFilled && isStudentIdValid);
  }

  // 입력값 변경될 때마다 검사
  nameInput.addEventListener('input', validateInputs);
  studentIdInput.addEventListener('input', validateInputs);

  // 다음 버튼 클릭 시 → 로컬스토리지에 저장하고 페이지 이동
  submitButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const studentId = studentIdInput.value.trim();

    // 🔥 서버 요청 없이, 로컬에만 저장!
    localStorage.setItem('student_name', name);
    localStorage.setItem('student_id', studentId);

    // 다음 단계로 이동
    window.location.href = 'http://127.0.0.1:5500/Eum회원가입2/join2.html';
  });

  // 페이지 로드시 초기 검사
  validateInputs();
});
