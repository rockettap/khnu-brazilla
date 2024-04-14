const rootSection = document.querySelector('.root');
const rootSectionContainer = document.querySelector('.root__container');

function getProductByParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (id) {
    return { id: id, exists: true };
  } else {
    return { id: null, exists: false };
  }
}

function getProducts() {
  fetch('http://localhost/api/products/', {
    method: 'GET'
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      if (data.products) {
        for (const product of data.products) {
          rootSectionContainer.innerHTML += `
            <div class="card">
              <a style="width: max-content" href="?id=${product.id}">${product.name}</a>
            </div>
          `;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const paramProduct = getProductByParam();
if (paramProduct.exists) {
  fetch('http://localhost/api/products/', {
    method: 'GET'
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      for (const product of data.products) {
        if (paramProduct.id == product.id) {
          rootSectionContainer.innerHTML += `
            <div class="card">
              <h1>${product.name}</h1>
              <img style="max-width: 512px; width: 100%" src="http://localhost/api/products/${product.file}" alt="Пакет кави" />
              <h1 style="text-align: initial">${product.price} ₴</h1>
              <p>${product.description}</p>
              <button onclick class="btn btn--reversed">Додати у кошик</button>
            </div>
          `;
          const btn = document.querySelector('.btn');
          btn.addEventListener('click', () => {
            let basket = JSON.parse(localStorage.getItem('basket')) || [];
            basket.push(product);
            localStorage.setItem('basket', JSON.stringify(basket));
          });
          break;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  getProducts();
}
