const eventId = new URLSearchParams(window.location.search).get("id");
let guests = JSON.parse(localStorage.getItem(`${eventId}-guests`) || "[]");
let checkIns = JSON.parse(localStorage.getItem(`${eventId}-checkins`) || "[]");

document.addEventListener("DOMContentLoaded", () => {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  const currentEvent = events.find(e => e.id === eventId);
  document.getElementById("eventTitle").innerText = `Event: ${currentEvent?.name} on ${currentEvent?.date}`;
  renderGuestTable();
});

function renderGuestTable() {
  const tbody = document.querySelector("#guestTable tbody");
  tbody.innerHTML = "";
  guests.forEach(g => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${g.name}</td>
      <td>${g.seat}</td>
      <td>${checkIns.includes(g.name.toLowerCase()) ? "Checked In" : "Not Checked In"}</td>
    `;
    tbody.appendChild(tr);
  });
}

function importCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const lines = text.trim().split("\n");

    const importedGuests = lines
      .slice(1) // skip header
      .map(line => {
        const [name, seat] = line.split(",");
        return {
          name: name.trim(),
          seat: seat.trim()
        };
      });

    guests = importedGuests;
    localStorage.setItem(`${eventId}-guests`, JSON.stringify(guests));
    renderGuestTable();
    alert("Guest list imported successfully.");
  };

  reader.readAsText(file);
}
