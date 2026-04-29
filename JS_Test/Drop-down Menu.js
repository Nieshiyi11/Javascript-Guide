const btn = document.querySelector(".toggleBtn");
const menu = document.querySelector(".menu");
btn.addEventListener("click", function(){
  menu.classList.toggle("open");
});