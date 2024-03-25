const loginSection = document.querySelector(".login");
const loginSectionContainer = document.querySelector(".login__container");

function getMessages() {
  fetch("http://localhost/api/contacts/", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status !== 401) {
        loginSectionContainer.innerHTML = `
          <div style="overflow-x: auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Ім'я</th>
                  <th scope="col">Пошта</th>
                  <th scope="col">Повідомлення</th>
                  <th scope="col">Час</th>
                </tr>
              </thead>
              <tbody id="table"></tbody>
            </table>
          </div>`;
        loginSection.classList.add("login--disable");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      if (data.messages) {
        for (const message of data.messages) {
          table.innerHTML += `
            <tr>
              <td>${message.name}</td>
              <td>${message.email}</td>
              <td>${message.message}</td>
              <td>${new Date(message.timestamp * 1000).toLocaleString()}</td>
            </tr>`;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
getMessages();

const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const details = {
    username: username.value,
    password: password.value,
  };

  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch("http://localhost/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    credentials: "include",
    body: formBody,
  })
    .then((response) => {
      if (response.status === 200) {
        getMessages();
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.log(error);
    });
});
