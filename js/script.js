const guestList = {
  "kenneth pabalan": "table-1-seat-1",
  "jane doe": "table-1-seat-2",
  "john smith": "table-2-seat-3"
};

const tables = [
  { id: 'table-1', name: 'Table 1' },
  { id: 'table-2', name: 'Table 2' }
];

const seatsPerTable = 6;

const container = document.getElementById('tablesContainer');

tables.forEach(table => {
  const tableDiv = document.createElement('div');
  tableDiv.className = 'table';
  tableDiv.id = table.id;

  const tableLabel = document.createElement('div');
  tableLabel.className = 'table-name';
  tableLabel.textContent = table.name;
  tableDiv.appendChild(tableLabel);

  for (let i = 1; i <= seatsPerTable; i++) {
    const angle = (i - 1) * (360 / seatsPerTable);
    const radius = 80;
    const x = Math.cos((angle * Math.PI) / 180) * radius + 80;
    const y = Math.sin((angle * Math.PI) / 180) * radius + 80;

    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.id = `${table.id}-seat-${i}`;
    seat.textContent = i;
    seat.style.left = `${x}px`;
    seat.style.top = `${y}px`;

    tableDiv.appendChild(seat);
  }

  container.appendChild(tableDiv);
});

function findSeat() {
  const name = document.getElementById("guestName").value.toLowerCase();
  const seatId = guestList[name];
  document.querySelectorAll(".seat").forEach(seat => seat.classList.remove("highlight"));
  if (seatId) {
    const seat = document.getElementById(seatId);
    seat.classList.add("highlight");
    seat.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    alert("Name not found.");
  }
}
