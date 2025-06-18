const response = await fetch("https://gsm-eum.p-e.kr/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    student_name: name,
    student_id: studentId,
    email: `${email}@gsm.hs.kr`,
    password: password,
  }),
});

// ✅ 1. 상태코드로 성공 여부 확인
if (!response.ok) {
  throw new Error("회원가입 실패: " + response.status);
}

// ✅ 2. 응답 본문을 텍스트로 먼저 받아본다
const text = await response.text();
let result = {};

// ✅ 3. JSON일 경우 파싱 시도
if (text.trim().startsWith("{")) {
  try {
    result = JSON.parse(text);
  } catch (e) {
    console.warn("⚠ JSON 파싱 실패, 서버 응답:", text);
  }
} else {
  console.warn("⚠ 서버가 JSON이 아닌 문자열 응답:", text);
}

// ✅ 4. JWT 추출
const token = result.token;
if (!token) {
  alert("JWT 토큰이 응답에 없습니다.");
  return;
}

// ✅ 5. 토큰 디코딩 및 저장
const payload = JSON.parse(atob(token.split(".")[1]));

localStorage.setItem("token", token);
localStorage.setItem("student_name", payload.name);
localStorage.setItem("student_id", payload.sub);

alert("회원가입 성공!");
window.location.href = "https://eum-frontend.vercel.app/";
