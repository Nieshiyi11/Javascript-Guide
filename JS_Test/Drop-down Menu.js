const btn = document.getElementById("toggleBtn");
const menu = document.getElementById("menu");
btn.addEventListener("click", function(){
  menu.classList.toggle("open");
});