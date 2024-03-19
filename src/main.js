import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AOS from "aos";
import "aos/dist/aos.css";

import "ress";

import "/scss/main.scss";

AOS.init();

var swiper = new Swiper(".mySwiper", {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 24,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    641: {
      slidesPerView: 2,
    },
    1081: {
      slidesPerView: 3,
    },
  },
});

const menuBtn = document.getElementById("menu-btn");
const headerNav = document.getElementById("header-nav");

menuBtn.addEventListener("click", function () {
  this.classList.toggle("menu-btn--opened");
  headerNav.classList.toggle("header__nav--opened");
  document.body.classList.toggle("scroll-lock");
});
