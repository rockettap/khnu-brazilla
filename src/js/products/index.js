const rootSection = document.querySelector(".root");
const rootSectionContainer = document.querySelector(".root__container");

function getProducts() {
  fetch("http://localhost/api/products/", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status !== 401) {
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      if (data.products) {
        for (const product of data.products) {
          console.log(product);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
getProducts();
