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
});

const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', () => {
  window.location.href =
    'http://127.0.0.1:5500/Eum%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%852/join2.html';
});
