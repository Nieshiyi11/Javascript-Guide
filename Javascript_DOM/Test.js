const btn = document.getElementById("toggleBtn");
const menu = document.getElementById("menu");
btn.addEventListener("click", () => {
  menu.classList.toggle("open");
});