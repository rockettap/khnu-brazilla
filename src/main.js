// Загальні стилі
import "ress";
import "/scss/main.scss";

// Загальний JavaScript
const menuBtn = document.getElementById("menu-btn");
const headerNav = document.getElementById("header-nav");

menuBtn.addEventListener("click", function () {
  this.classList.toggle("menu-btn--opened");
  headerNav.classList.toggle("header__nav--opened");
  document.body.classList.toggle("scroll-lock");
});
