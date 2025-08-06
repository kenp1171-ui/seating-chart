function getEventIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function findGuest() {
  const name = document.getElementById("guestName").value.toLowerCase();
  const eventId = getEventIdFromURL();
  const resultDiv = document.getElementById("result");

  const guestList = {
    "kenneth pabalan": "Seat 1",
    "jane doe": "Seat 2",
    "john smith": "Seat 3"
  };

  if (guestList[name]) {
    resultDiv.innerHTML = `
      <p><strong>Found:</strong> ${guestList[name]}</p>
      <button onclick="checkIn('${name}')">Check-In</button>
    `;
  } else {
    resultDiv.innerHTML = "<p>Guest not found.</p>";
  }
}

function checkIn(name) {
  const eventId = getEventIdFromURL();
  let checkIns = JSON.parse(localStorage.getItem(`${eventId}-checkins`) || "[]");

  if (!checkIns.includes(name)) {
    checkIns.push(name);
    localStorage.setItem(`${eventId}-checkins`, JSON.stringify(checkIns));
    alert("Checked in successfully!");
  } else {
    alert("Already checked in.");
  }
}
