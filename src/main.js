import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "ress";
import "/scss/main.scss";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

new Swiper(".mySwiper", {
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

// Загальний JavaScript
const menuBtn = document.getElementById("menu-btn");
const headerNav = document.getElementById("header-nav");

menuBtn.addEventListener("click", function () {
  this.classList.toggle("menu-btn--opened");
  headerNav.classList.toggle("header__nav--opened");
  document.body.classList.toggle("scroll-lock");
});

const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const details = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch("http://localhost/api/contacts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      alert(data.message);
    })
    .catch((error) => {
      console.log(error);
    });
});
