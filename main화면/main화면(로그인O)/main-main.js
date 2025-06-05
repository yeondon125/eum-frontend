const deleteButtons = document.querySelectorAll(".label-icon");
deleteButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("deleteModal").style.display = "flex";
  });
});

function closeModal() {
  document.getElementById("deleteModal").style.display = "none";
}

let currentPages = {};

function slideCards(containerId, direction) {
  const row = document.getElementById(containerId);
  const card = row.querySelector(".card");
  if (!card) return;

  const cardWidth = card.offsetWidth + 28;
  const totalCards = row.querySelectorAll(".card").length;
  const cardsPerPage = 5;
  const maxPage = Math.floor((totalCards - 1) / cardsPerPage);

  if (!currentPages[containerId]) currentPages[containerId] = 0;
  currentPages[containerId] += direction;

  if (currentPages[containerId] < 0) currentPages[containerId] = 0;
  if (currentPages[containerId] > maxPage) currentPages[containerId] = maxPage;

  const moveX = currentPages[containerId] * cardWidth * cardsPerPage;
  row.style.transform = `translateX(-${moveX}px)`;
}
