<template>
  <h1 v-if="error">{{ error }}</h1>
  <v-sheet v-else-if="createdLoading" style="display: flex">
    <v-progress-circular
      class="mx-auto"
      :size="96"
      :width="8"
      color="#007aff"
      indeterminate
    ></v-progress-circular>
  </v-sheet>
  <div class="product" v-else-if="product">
    <v-img class="product__image" :src="`${API}/products/${product.file}`" cover />
    <div class="product__info">
      <h1 class="mb-4">{{ product.name }}</h1>
      <h3 class="mb-4">{{ product.price }} ₴</h3>
      <p class="mb-4">{{ product.description }}</p>
      <v-btn
        class="product__btn"
        prepend-icon="mdi-cart"
        size="large"
        color="#007aff"
        variant="flat"
        rounded="xl"
        :loading="loading"
        @click="addToCart"
      >
        Додати у кошик
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      API: import.meta.env.VITE_API_URL,

      product: null,

      createdLoading: true,
      loading: false,

      error: null
    };
  },
  methods: {
    loadProduct(id) {
      fetch(`${this.API}/products/?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.code !== 200) {
            this.totalPages = 0;
            this.error = `${data.code} — ${data.message}`;
            this.createdLoading = false;
            return;
          }
          this.product = data.product;
          this.createdLoading = false;
        })
        .catch((error) => {
          this.error = error;
          this.createdLoading = false;
          console.error(error);
        });
    },
    addToCart() {
      this.loading = true;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(this.product);
      localStorage.setItem('cart', JSON.stringify(cart));
      setTimeout(async () => {
        this.loading = false;
      }, 1000);
    }
  },
  created() {
    const appElement = document.getElementById('app');
    appElement.style.marginTop = 'auto';
    this.loadProduct(this.$route.params.id);
  },
  watch: {
    createdLoading() {
      const appElement = document.getElementById('app');
      appElement.style.marginTop = '';
    }
  },
  beforeUnmount() {
    const appElement = document.getElementById('app');
    appElement.style.marginTop = '';
  }
};
</script>

<style scoped lang="scss">
.product {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.product__image {
  width: calc(548px * (3 / 4));
  height: 100%;
  border-radius: 8px;
}

.product__info {
  flex: 1 0;
  min-width: 548px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.product__btn {
  margin-top: auto;
}
</style>
