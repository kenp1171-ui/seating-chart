function handleCreateEvent() {
  const name = prompt("Enter event name:");
  const date = prompt("Enter event date (YYYY-MM-DD):");
  const eventId = `event-${Date.now()}`;
  const event = { id: eventId, name, date };

  let events = JSON.parse(localStorage.getItem("events") || "[]");
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));

  const qrURL = `${window.location.origin}/seating-chart/event.html?id=${eventId}`;
  generateQR(qrURL, eventId);
}

function generateQR(url, eventId) {
  const qrDiv = document.getElementById("qrPreview");
  qrDiv.innerHTML = "";

  // Show the link
  const linkText = document.createElement("p");
  linkText.textContent = url;
  qrDiv.appendChild(linkText);

  // Generate QR code
  new QRCode(qrDiv, url);

  // Add a Manage Guests button
  const manageBtn = document.createElement("button");
  manageBtn.textContent = "Manage Guests";
  manageBtn.onclick = () => {
    window.location.href = `manage-guests.html?id=${eventId}`;
  };
  qrDiv.appendChild(manageBtn);
}
