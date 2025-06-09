document.addEventListener("DOMContentLoaded", function () {
  const name = document.getElementById("user-button");
  const uname = localStorage.getItem("student_name");
  const token = localStorage.getItem("token");
  const button = document.getElementById("user-button");

  const plus = document.getElementById("plus-button");

  if (token) {
    name.innerHTML = `<img src="/images/icons/Vector.svg" alt="아이콘" />${uname}`;
  } else {
    name.innerHTML = `<img src="/images/icons/Vector.svg" alt="아이콘" />로그인`;
  }

  button.addEventListener("click", function () {
    location.href = "/index.html";
  });

  plus.addEventListener("click", function () {
    if (token) {
      location.href = "/mget.html";
    } else {
      alert("로그인 후 이용 가능합니다.");
    }
  });
});
