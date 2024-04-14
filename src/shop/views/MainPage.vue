<template>
  <h1 v-if="error">{{ error }}</h1>
  <ul v-if="products.length" class="advantages__list mt-6 mb-6">
    <v-card v-for="item of products" :key="item.id">
      <v-img height="196.5" :src="`${API}/products/${item.file}`" cover></v-img>
      <v-card-item>
        <v-card-title>{{ item.name }}</v-card-title>
        <div class="text-subtitle-1">{{ item.price }} ₴</div>
        <v-card-subtitle>
          <span>{{ item.description }}</span>
        </v-card-subtitle>
      </v-card-item>
      <v-card-actions>
        <RouterLink :to="`product/${item.id}`">
          <v-btn color="#007aff" variant="text" append-icon="mdi-arrow-right"> Переглянути </v-btn>
        </RouterLink>
      </v-card-actions>
    </v-card>
  </ul>
  <v-pagination
    v-if="totalPages"
    v-model="page"
    :length="totalPages"
    :total-visible="7"
  ></v-pagination>
</template>

<script>
export default {
  data() {
    return {
      API: import.meta.env.VITE_API_URL,

      page: parseInt(this.$route.query.page) > 1 ? parseInt(this.$route.query.page) : 1,
      products: [],
      totalPages: null,

      error: null
    };
  },
  methods: {
    loadProducts(page) {
      fetch(`${this.API}/products/?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.code !== 200) {
            this.error = `${data.code} — ${data.message}`;
            this.totalPages = 0;
            return;
          }
          this.products = data.products;
          this.totalPages = data.totalPages;
          this.$router.push({ query: { page: page } });
        })
        .catch((error) => {
          this.error = 'Помилка!';
          console.error(error);
        });
    }
  },
  watch: {
    page() {
      this.loadProducts(this.page);
    }
  },
  created() {
    this.loadProducts(this.page);
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
