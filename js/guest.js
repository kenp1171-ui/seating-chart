const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');

document.getElementById('searchBtn').onclick = async function() {
  const name = document.getElementById('guestName').value;
  if (!name) return;

  // Search guest in event (implement guest list logic as needed)
  const guestRef = firebase.firestore().collection('events').doc(eventId).collection('guests').doc(name);
  const guestDoc = await guestRef.get();
  if (guestDoc.exists) {
    document.getElementById('result').innerHTML = `
      <p>Welcome, ${name}!</p>
      <button onclick="checkIn('${name}')">Check-In</button>
    `;
  } else {
    document.getElementById('result').innerText = 'Name not found.';
  }
};

window.checkIn = async function(name) {
  const guestRef = firebase.firestore().collection('events').doc(eventId).collection('guests').doc(name);
  await guestRef.update({ checkedIn: true });
  document.getElementById('result').innerText = 'Checked in successfully!';
};