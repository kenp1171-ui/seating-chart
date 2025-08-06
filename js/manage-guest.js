const eventId = new URLSearchParams(window.location.search).get("id");
const guestsRef = firebase.database().ref("guests/" + eventId);

// Load all guests
function loadGuests() {
  guestsRef.once("value").then(snapshot => {
    const guestList = document.getElementById("guestList");
    guestList.innerHTML = ""; // Clear old list

    snapshot.forEach(child => {
      const guest = child.val();
      const li = document.createElement("li");
      li.textContent = `${guest.name} — Table ${guest.table} ${guest.checkedIn ? '✅' : ''}`;
      guestList.appendChild(li);
    });
  });
}

// Add a new guest
function addGuest() {
  const name = document.getElementById("guestName").value.trim();
  const table = document.getElementById("guestTable").value.trim();

  if (!name || !table) {
    alert("Please fill in both fields.");
    return;
  }

  const newGuestRef = guestsRef.push();
  newGuestRef.set({
    name,
    table,
    checkedIn: false
  }).then(() => {
    document.getElementById("guestName").value = "";
    document.getElementById("guestTable").value = "";
    loadGuests();
  });
}

// Load guests on page load
window.onload = loadGuests;
