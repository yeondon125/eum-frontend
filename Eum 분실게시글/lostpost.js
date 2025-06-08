// 1. 주소에서 id 파라미터 추출 (?id=3 → 3)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2. 단일 게시글 API 호출 (id로)
fetch(`https://gsm-eum.p-e.kr/lostitem/${id}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("서버 응답 실패");
    }
    return res.json();
  })
  .then((post) => {
    // 3. 받아온 게시글 내용을 HTML에 표시

    // 작성자
    document.querySelectorAll(".user-name").forEach((el) => {
      el.textContent = post.student || "작성자 없음";
    });

    // 이미지
    const img = document.getElementById("preview");
    if (img) {
      img.src = post.imageUrl || "https://via.placeholder.com/200";
      img.style.display = "block";
    }

    // 내용
    const content = document.querySelector(".explanation div");
    if (content) {
      content.textContent = post.content || "내용 없음";
    }
  })
  .catch((err) => {
    console.error("게시글 불러오기 실패:", err);
    alert("게시글을 불러오지 못했습니다.");
  });
