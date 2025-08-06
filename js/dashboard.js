function createNewEvent() {
  const name = prompt("Event name:");
  const date = prompt("Event date (e.g., 2025-08-15):");

  if (!name || !date) {
    alert("Event name and date are required.");
    return;
  }

  const db = firebase.database();
  const newRef = db.ref("events").push();
  newRef.set({ name, date });
}

firebase.database().ref("events").on("value", (snapshot) => {
  const list = document.getElementById("eventList");
  list.innerHTML = "";

  snapshot.forEach((child) => {
    const event = child.val();
    const li = document.createElement("li");
    li.textContent = `${event.name} (${event.date})`;
    li.style.cursor = "pointer";
    li.onclick = () => {
      window.location.href = `event.html?id=${child.key}`;
    };
    list.appendChild(li);
  });
});
