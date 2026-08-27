const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

async function loadEvent() {
  const response = await fetch('./events.json');
  const data = await response.json();
  return data.find(event => event.event_id === eventId);
}

(async function() {
  const event = await loadEvent();
  document.querySelector(".event_banner > img").src = "assets/img/cards/" + event.event_banner + '.png';
  document.querySelector(".event_title").innerHTML = event.event_title;
  document.querySelector(".event_day").innerHTML = event.event_day;
  document.querySelector(".event_month").innerHTML = event.event_month;
  document.querySelector(".event_location").innerHTML = event.event_location;
  document.querySelector(".event_address").innerHTML = event.event_address;
  document.querySelector(".event_start").innerHTML = event.event_start;
  document.querySelector(".event_open").innerHTML = event.event_open;
})();
