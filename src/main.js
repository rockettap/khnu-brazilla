import "ress";
import "/scss/main.scss";

const menuButton = document.getElementById("menuButton");

menuButton.addEventListener("click", function () {
  this.classList.toggle("menu-btn--opened");
  document.body.classList.toggle("scroll-lock");
});
