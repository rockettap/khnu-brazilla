import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AOS from "aos";
import "aos/dist/aos.css";

import "/scss/_slider.scss";

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
