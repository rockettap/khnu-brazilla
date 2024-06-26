import Accordion from 'accordion-js';

import 'accordion-js/dist/accordion.min.css';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import AOS from 'aos';
import 'aos/dist/aos.css';

import '/scss/_slider.scss';
import '/scss/_form.scss';

AOS.init();

new Accordion('.accordion-container');

const swiper = new Swiper('.mySwiper', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 24,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    641: {
      slidesPerView: 2
    },
    1081: {
      slidesPerView: 3
    }
  }
});

const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const details = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch(`${import.meta.env.VITE_API_URL}/contacts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      name.value = '';
      email.value = '';
      message.value = '';
      alert(data.message);
    })
    .catch((error) => {
      console.error(error);
    });
});

const slider = document.querySelector('.swiper-wrapper');
fetch(`${import.meta.env.VITE_API_URL}/products/?page=1`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.products) {
      for (const product of data.products) {
        // prettier-ignore
        const newSlide = `
        <div class="swiper-slide">
            <div
              class="swiper-slide__inner"
              data-aos="fade-up"
              data-aos-anchor=".products__title"
            >
              <img
                src="${import.meta.env.VITE_API_URL}/products/${product.file}"
                alt="Пакет кави"
              />
              <h3 class="swiper-slide__title">
                <a href="shop/#/product/${product.id}">${product.name}</a>
              </h3>
              <h4 class="swiper-slide__price">${product.price} ₴</h4>
            </div>
          </div>`;
        slider.insertAdjacentHTML('afterbegin', newSlide);
      }
    }
    swiper.update();
  })
  .catch((error) => {
    console.error(error);
  });
