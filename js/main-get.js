fetch("https://gsm-eum.p-e.kr/main")
  .then((response) => {
    console.log("응답 상태:", response.status);
    return response.json();
  })
  .then((data) => {
    console.log("받은 데이터:", data);

    const lostCard = document.getElementById("found-row");
    if (!lostCard) {
      console.error(" 'found' 클래스를 가진 요소가 없습니다.");
      return;
    }

    lostCard.innerHTML = "";

    data.getitem.content.forEach((post) => {
      const id = post.boardId;
      const card = document.createElement("div");
      card.className = "card";
      // console.log(`안녕하세요.${id}`);
      card.id = id;
      card.innerHTML = `
        <p class="label">습득물</p>
        <img
          src="${post.getitem_url_image || "https://via.placeholder.com/150"}"
          alt="습득물 이미지"
          class="item-img"
        />
        <div class="info">
          <p class="student"><img src="../icons/Vector.svg" alt="아이콘" /> ${
            post.student_id || "학번없음"
          }|${post.student_name || "이름없음"}</p>
          <p class="name">${post.getitem_name || "제목 없음"}</p>
        </div>`;

      card.addEventListener("click", () => {
        window.location.href = `getpost.html?id=${id}`;
      });
      lostCard.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("에러 발생:", err);
    const lostCard = document.getElementsByClassName("foun-row");
    if (lostCard) {
      lostCard.innerHTML = "<p>게시글을 불러오지 못했습니다.</p>";
    }
  });
