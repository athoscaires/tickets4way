const card = document.querySelector("div.card");

async function loadEvents() {
  const response = await fetch('./cards.json');
  const data = await response.json();
  return data;
};

(async function() {
  const cards_events = await loadEvents();
  const divCards = document.querySelector('.cards');
  cards_events.map(event => {
    const cardClone = card.cloneNode(true);
    cardClone.addEventListener("click", () => {window.location.href = `event.html?id=${event.event_id}`;});
    cardClone.querySelector("img").src = "assets/img/cards/" + event.banner + '.png';
    cardClone.querySelector(".title").innerHTML = event.title;
    cardClone.querySelector(".info > p.card-location").innerHTML = event.location;
    cardClone.querySelector(".info > p.card-address").innerHTML = event.address;
    cardClone.querySelector(".info-date > p.card-month").innerHTML = event.card_month;
    cardClone.querySelector(".info-date > p.card-day").innerHTML = event.card_day;
    divCards.appendChild(cardClone);
  });
  card.remove();
  const cards = [...document.querySelectorAll(".cards .card")];
})();
