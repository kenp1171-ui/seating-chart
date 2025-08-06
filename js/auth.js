function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "password123") {
    localStorage.setItem("authenticated", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
  return false;
}
