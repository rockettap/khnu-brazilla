<template>
  <div v-if="cart.length">
    <h1 class="mt-6 mb-6">Оформлення замовлення</h1>
    <div style="display: flex; gap: 24px; flex-wrap: wrap">
      <div style="flex: 1 0; max-width: 548px; max-width: 100%">
        <v-form fast-fail @submit.prevent>
          <v-text-field
            class="mb-4"
            v-model="name"
            hide-details="auto"
            :rules="[required]"
            label="Ім'я"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            v-model="email"
            hide-details="auto"
            label="Електронна пошта"
            :rules="[validateEmail]"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            v-model="postcode"
            hide-details="auto"
            :rules="[required]"
            label="Поштовий індекс"
          ></v-text-field>
          <v-btn
            class="mt-2"
            type="submit"
            block
            size="large"
            color="#007aff"
            variant="flat"
            rounded="xl"
            :loading="loading"
            @click="order"
          >
            Підтвердити замовлення
          </v-btn>
        </v-form>
      </div>
      <div
        style="flex: 1 0; min-width: 274px; max-width: 100%; display: flex; flex-direction: column"
      >
        <h3 class="mb-6">{{ computedQuantity }} {{ computedQuantityPlural }}</h3>
        <v-card class="mb-4" v-for="item in computedCart">
          <v-card-text>
            <RouterLink :to="`product/${item.id}`">{{ item.name }}</RouterLink>
            {{ ` — ${item.quantity} шт.` }}
          </v-card-text>
        </v-card>
        <h3 class="mt-2">Усього — {{ computedTotal }} ₴</h3>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="mt-6 mb-6">Кошик порожній!</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      API: import.meta.env.VITE_API_URL,

      cart: [],

      name: '',
      email: '',
      postcode: '',

      loading: false,

      error: null
    };
  },
  computed: {
    computedCart() {
      const cartObj = {};
      this.cart.forEach((item) => {
        const itemId = item.id;
        if (cartObj[itemId]) {
          cartObj[itemId].quantity++;
        } else {
          cartObj[itemId] = { ...item, quantity: 1 };
        }
      });
      return cartObj;
    },
    computedTotal() {
      let total = 0;
      Object.values(this.computedCart).forEach((item) => {
        total += item.quantity * item.price;
      });
      return total;
    },
    computedQuantity() {
      let quantity = 0;
      Object.values(this.computedCart).forEach((item) => {
        quantity += item.quantity;
      });
      return quantity;
    },
    computedQuantityPlural() {
      if (
        this.computedQuantity % 10 === 1 &&
        (this.computedQuantity === 1 || this.computedQuantity > 20)
      ) {
        return 'товар';
      } else if (
        this.computedQuantity % 10 >= 2 &&
        this.computedQuantity % 10 <= 4 &&
        !(this.computedQuantity % 100 >= 11 && this.computedQuantity % 100 <= 14)
      ) {
        return 'товари';
      } else {
        return 'товарів';
      }
    }
  },
  created() {
    this.parseLocalStorage();
  },
  methods: {
    parseLocalStorage() {
      try {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      } catch (error) {
        this.error = 'Помилка!';
        console.error(error);
      }
    },
    order() {
      this.loading = true;
      const details = {
        name: this.name,
        email: this.email,
        postcode: this.postcode,
        products: this.cart.map((product) => product.id)
      };

      fetch(`${this.API}/orders/`, {
        method: 'POST',
        body: JSON.stringify(details)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code !== 201) {
            return;
          }
          localStorage.removeItem('cart');
          this.cart = [];
          console.log(data);
        })
        .catch((error) => {
          // this.error = 'Помилка!';
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validateEmail(value) {
      if (!value) return "Електронна пошта є обов'язковою";
      // prettier-ignore
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Введіть правильну адресу електронної пошти';
    },
    required(value) {
      return !!value || "Поле є обов'язковим";
    }
  }
};
</script>
