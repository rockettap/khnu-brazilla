const loginSection = document.querySelector('.login');
const loginSectionContainer = document.querySelector('.login__container');

let executed = false;

function getMessages() {
  fetch('http://localhost/api/contacts/', {
    method: 'GET',
    credentials: 'include'
  })
    .then((response) => {
      if (response.status !== 401) {
        if (!executed) {
          loginSectionContainer.innerHTML = '';
          executed = true;
        }
        loginSectionContainer.innerHTML += `
          <h2 style="line-height: 3">Допомога</h2>
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
              <tbody id="table1"></tbody>
            </table>
          </div>`;
        loginSection.classList.add('login--disable');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      if (data.messages) {
        for (const message of data.messages) {
          table1.innerHTML += `
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

function getCreateForm() {
  loginSectionContainer.innerHTML += `
    <form id="form2">
      <p>
        <label>
          <span>Ім'я</span>
          <input type="text" name="name" id="name" required />
        </label>
      </p>
      <p>
        <label>
          <span>Ціна</span>
          <input type="number" name="price" id="price" required />
        </label>
      </p>
      <p>
        <label>
          <span>Опис</span>
          <textarea name="description" id="description" rows="3" required></textarea>
        </label>
      </p>
      <p>
        <label>
          <span>Файл</span>
          <input type="file" name="file" id="file" required />
        </label>
      </p>
      <div>
        <button type="submit" class="btn btn--reversed contact__btn">
          Відправити
        </button>
      </div>
    </form>`;

  loginSectionContainer.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'form2') {
      e.preventDefault(); // Prevent default form submission

      // Extract form data
      const formData = new FormData(e.target);

      // Construct request options
      const requestOptions = {
        method: 'POST',
        body: formData,
        credentials: 'include'
      };

      // Send form data to server
      fetch('http://localhost:80/api/products/', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
  });
}

function getOrders() {
  fetch('http://localhost/api/orders/', {
    method: 'GET',
    credentials: 'include'
  })
    .then((response) => {
      if (response.status !== 401) {
        if (!executed) {
          loginSectionContainer.innerHTML = '';
          executed = true;
        }
        getCreateForm();
        loginSectionContainer.innerHTML += `
          <h2 style="line-height: 3">Замовлення</h2>
          <div style="overflow-x: auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Ім'я</th>
                  <th scope="col">Пошта</th>
                  <th scope="col">Поштовий індекс</th>
                  <th scope="col">Товари</th>
                </tr>
              </thead>
              <tbody id="table2"></tbody>
            </table>
          </div>`;
        loginSection.classList.add('login--disable');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      if (data.orders) {
        for (const order of data.orders) {
          // prettier-ignore
          const products = order.products.map((product) => `<a href="/khnu-brazilla/products/?id=${product.id}">${product.name}</a>`).join(", ");
          table2.innerHTML += `
            <tr>
              <td>${order.name}</td>
              <td>${order.email}</td>
              <td>${order.postcode}</td>
              <td>${products}</td>
            </tr>`;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
getOrders();

const username = document.getElementById('username');
const password = document.getElementById('password');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const details = {
    username: username.value,
    password: password.value
  };

  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('http://localhost/api/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    credentials: 'include',
    body: formBody
  })
    .then((response) => {
      if (response.status === 200) {
        getMessages();
        getOrders();
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
