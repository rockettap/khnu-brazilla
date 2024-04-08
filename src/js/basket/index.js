const rootSection = document.querySelector(".root");
const rootSectionContainer = document.querySelector(".root2__container");

let basket = JSON.parse(localStorage.getItem("basket")) || [];
for (const item of basket) {
  rootSectionContainer.innerHTML += `
    <div class="card">
      <a href="/khnu-brazilla/products/?id=${item.id}">${item.name}</a>
      <p>${item.price} ₴</p>
    </div>
  `;
}

const name = document.getElementById("name");
const email = document.getElementById("email");
const postcode = document.getElementById("postcode");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const details = {
    name: name.value,
    email: email.value,
    postcode: postcode.value,
    products: basket.map((product) => product.id),
  };

  fetch("http://localhost/api/orders/", {
    method: "POST",
    body: JSON.stringify(details),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      name.value = "";
      email.value = "";
      postcode.value = "";
      localStorage.removeItem("basket");
      basket = [];
      rootSectionContainer.innerHTML = "";
      alert(data.message);
    })
    .catch((error) => {
      console.log(error);
    });
});
