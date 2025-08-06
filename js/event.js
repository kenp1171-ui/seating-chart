const eventId = new URLSearchParams(window.location.search).get("id");
const eventRef = firebase.database().ref("events/" + eventId);

eventRef.once("value").then(snapshot => {
  const event = snapshot.val();
  document.getElementById("eventTitle").textContent = event.name;
  document.getElementById("eventDate").textContent = formatDate(event.date);

  // QR code generation
  const qrText = `${window.location.origin}/guest.html?id=${eventId}`;
  const qrDiv = document.getElementById("qrCode");
  const qr = new QRCode(qrDiv, {
    text: qrText,
    width: 150,
    height: 150
  });

  // Download QR as image
  setTimeout(() => {
    const img = qrDiv.querySelector("img");
    if (img) {
      document.getElementById("downloadQR").href = img.src;
    }
  }, 500);

  // View live site
  document.getElementById("viewLiveBtn").onclick = () => {
    window.open(qrText, "_blank");
  };

  // Manage guest list
  document.getElementById("manageGuestsBtn").onclick = () => {
    window.location.href = `manage-guests.html?id=${eventId}`;
  };
});

function formatDate(dateStr) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
}
