guestRef.on("value", (snapshot) => {
  const list = document.getElementById("guestList");
  list.innerHTML = "";

  snapshot.forEach((child) => {
    const guest = child.val();
    const key = child.key;

    const li = document.createElement("li");
    li.textContent = `${guest.name} (Table ${guest.table}) - `;

    const status = document.createElement("span");
    status.textContent = guest.checkedIn ? "✅ Checked in" : "❌ Not checked in";
    li.appendChild(status);

    const button = document.createElement("button");
    button.textContent = guest.checkedIn ? "Undo" : "Check-in";
    button.style.marginLeft = "10px";
    button.onclick = () => {
      guestRef.child(key).update({ checkedIn: !guest.checkedIn });
    };

    li.appendChild(button);
    list.appendChild(li);
  });
});
