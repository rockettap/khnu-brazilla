<template>
  <h1 v-if="error">{{ error }}</h1>

  <template v-else-if="createdLoading">
    <v-sheet style="display: flex">
      <v-progress-circular
        class="mx-auto"
        :size="96"
        :width="8"
        color="#007aff"
        indeterminate
      ></v-progress-circular>
    </v-sheet>
  </template>

  <template v-else-if="product">
    <div class="product">
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
</template>

<script>
export default {
  data() {
    return {
      API: import.meta.env.VITE_API_URL,

      product: null,

      createdLoading: false,
      loading: false,

      error: null
    };
  },
  created() {
    this.createdLoading = true;
    this.loadProduct(this.$route.params.id);
  },
  beforeUnmount() {
    document.getElementById('app').style.marginTop = '';
  },
  watch: {
    createdLoading() {
      document.getElementById('app').style.marginTop = this.createdLoading ? 'auto' : '';
    }
  },
  methods: {
    loadProduct(id) {
      fetch(`${this.API}/products/?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.code !== 200) {
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
