// fetch("https://amond-blog.n-e.kr/api/v1/articles")
//   .then((response) => {
//     console.log("응답 상태:", response.status);
//     return response.json();
//   })
//   .then((data) => {
//     console.log("받은 데이터:", data);

//     localStorage.setItem("posts", JSON.stringify(data));

//     const lostCard = document.getElementById("lost-row");
//     if (!lostCard) {
//       console.error(" 'lost' 클래스를 가진 요소가 없습니다.");
//       return;
//     }

//     lostCard.innerHTML = "";

//     data.forEach((post) => {
//       const card = document.createElement("div");
//       card.className = "card";
//       card.innerHTML = `
//         <p class="label">분실물</p>
//         <img
//           src="${postitem_url_image || "https://via.placeholder.com/150"}"
//           alt="분실물 이미지"
//           class="item-img"
//         />
//         <div class="info">
//           <p class="student"><img src="../icons/Vector.svg" alt="아이콘" /> ${
//             student_id || "학번없음"
//           }|${student_name || "이름없음"}</p>
//           <p class="name">${"lostitem_name" || "제목 없음"}</p>
//         </div>
//       `;
//       lostCard.appendChild(card);
//     });
//   })
//   .catch((err) => {
//     console.error("에러 발생:", err);
//     const lostCard = document.getElementsByClassName("lost")[0];
//     if (lostCard) {
//       lostCard.innerHTML = "<p>게시글을 불러오지 못했습니다.</p>";
//     }
//   });

fetch("https://amond-blog.n-e.kr/api/v1/articles")
  .then((response) => {
    console.log("응답 상태:", response.status);
    return response.json();
  })
  .then((data) => {
    console.log("받은 데이터:", data);

    localStorage.setItem("posts", JSON.stringify(data));

    const lostCard = document.getElementById("lost-row");
    if (!lostCard) {
      console.error(" 'lost' 클래스를 가진 요소가 없습니다.");
      return;
    }

    lostCard.innerHTML = "";

    data.forEach((post) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <p class="label">분실물</p>
        <img
          src="${post.imageUrl || "https://via.placeholder.com/150"}"
          alt="분실물 이미지"
          class="item-img"
        />
        <div class="info">
          <p class="student"><img src="../icons/Vector.svg" alt="아이콘" /> ${
            post.student || "학번|이름 없음"
          }</p>
          <p class="name">${post.title || "제목 없음"}</p>
        </div>
      `;
      lostCard.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("에러 발생:", err);
    const lostCard = document.getElementsByClassName("lost")[0];
    if (lostCard) {
      lostCard.innerHTML = "<p>게시글을 불러오지 못했습니다.</p>";
    }
  });
