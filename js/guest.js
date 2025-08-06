const eventId = new URLSearchParams(window.location.search).get("id");
const eventRef = firebase.database().ref("events/" + eventId);
const guestsRef = firebase.database().ref("guests/" + eventId);

eventRef.once("value").then(snapshot => {
  const event = snapshot.val();
  if (event) {
    document.getElementById("eventDetails").textContent = `You're viewing: ${event.name} (${formatDate(event.date)})`;
  } else {
    document.getElementById("eventDetails").textContent = "Event not found.";
  }
});

function searchGuest() {
  const name = document.getElementById("guestSearch").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Searching...";

  guestsRef.once("value").then(snapshot => {
    let found = false;

    snapshot.forEach(child => {
      const guest = child.val();
      const guestId = child.key;

      if (guest.name.toLowerCase() === name) {
        found = true;
        const isCheckedIn = guest.checkedIn === true;

        resultDiv.innerHTML = `
          <p><strong>Name:</strong> ${guest.name}</p>
          <p><strong>Table:</strong> ${guest.table}</p>
          <p><strong>Status:</strong> ${isCheckedIn ? "✅ Checked In" : "❌ Not Checked In"}</p>
          ${!isCheckedIn ? `<button onclick="checkInGuest('${guestId}')">Check In</button>` : ""}
        `;
      }
    });

    if (!found) {
      resultDiv.innerHTML = "<p>Guest not found. Please check your spelling.</p>";
    }
  });
}

function checkInGuest(guestId) {
  guestsRef.child(guestId).update({ checkedIn: true }).then(() => {
    alert("You are now checked in!");
    searchGuest(); // Refresh status
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}
