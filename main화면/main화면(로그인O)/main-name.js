document.addEventListener("DOMContentLoaded", function () {
  const name = document.getElementById("user-button");
  const uname = localStorage.setItem("student_name");
  name.innerHTML = `<img src="../icons/Vector.svg" alt="사용자 아이콘" />${uname}`;
});
