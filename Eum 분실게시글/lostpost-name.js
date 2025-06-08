document.addEventListener("DOMContentLoaded", function () {
  const info = document.getElementById("user-info");
  const uname = localStorage.getItem("student_name");
  const token = localStorage.getItem("token");
  const button = document.getElementById("user-button");

  if (token) {
    name.innerHTML = `<img src="../icons/Vector.svg" alt="사용자 아이콘" />${uname}`;
  } else {
    info.innerHTML = `<img src="../icons/Vector.svg" alt="사용자 아이콘" />로그인`;
  }

  button.addEventListener("click", function () {
    //대충 개쩌는 파일 이동시키기기
  });
});
