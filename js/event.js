const eventId = new URLSearchParams(window.location.search).get("id");

if (!eventId) {
  alert("Event ID not found.");
  window.location.href = "index.html";
}

const eventRef = firebase.database().ref("events/" + eventId);
const guestRef = firebase.database().ref("guests/" + eventId);

eventRef.once("value").then((snapshot) => {
  const event = snapshot.val();
  document.getElementById("eventTitle").textContent = `${event.name} - ${event.date}`;
});

// Determine if admin or guest
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Admin view
    document.getElementById("adminView").style.display = "block";

    // Generate QR code
    new QRCode(document.getElementById("qrCode"), {
      text: `https://kenp1171-ui.github.io/seating-chart/event.html?id=${eventId}`,
      width: 128,
      height: 128
    });

    // Manage guests button
    document.getElementById("manageGuestsBtn").onclick = () => {
      window.location.href = `manage-guests.html?id=${eventId}`;
    };
  } else {
    // Guest view
    document.getElementById("guestView").style.display = "block";
  }
});

function searchGuest() {
  const query = document.getElementById("guestSearch").value.trim().toLowerCase();
  const resultDiv = document.getElementById("guestResult");
  resultDiv.innerHTML = "";

  if (!query) {
    resultDiv.textContent = "Please enter your name.";
    return;
  }

  guestRef.once("value", (snapshot) => {
    let found = false;

    snapshot.forEach((child) => {
      const guest = child.val();
      const guestKey = child.key;

      if (guest.name.toLowerCase() === query) {
        found = true;

        const div = document.createElement("div");
        div.innerHTML = `
          <p>Name: <strong>${guest.name}</strong></p>
          <p>Table: <strong>${guest.table}</strong></p>
          <p>Status: <strong>${guest.checkedIn ? "✅ Checked in" : "❌ Not checked in"}</strong></p>
        `;

        if (!guest.checkedIn) {
          const btn = document.createElement("button");
          btn.textContent = "Check In";
          btn.onclick = () => {
            guestRef.child(guestKey).update({ checkedIn: true }).then(() => {
              alert("Check-in successful!");
              searchGuest(); // refresh
            });
          };
          div.appendChild(btn);
        }

        resultDiv.appendChild(div);
      }
    });

    if (!found) {
      resultDiv.textContent = "Guest not found. Please check your spelling.";
    }
  });
}
