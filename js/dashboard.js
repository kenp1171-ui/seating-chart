function handleCreateEvent() {
  const name = prompt("Enter event name:");
  const date = prompt("Enter event date (YYYY-MM-DD):");
  const eventId = `event-${Date.now()}`;
  const event = { id: eventId, name, date };

  let events = JSON.parse(localStorage.getItem("events") || "[]");
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));

  const qrURL = `event.html?id=${eventId}`;
  generateQR(qrURL);
  
}

function generateQR(url) {
  const qrDiv = document.getElementById("qrPreview");
  qrDiv.innerHTML = "";
  new QRCode(qrDiv, url);
  const link = document.createElement("p");
link.textContent = url;
qrDiv.appendChild(link);

}
