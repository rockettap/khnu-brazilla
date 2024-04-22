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

  <template v-else>
    <ul v-if="products.length" class="advantages__list mb-6">
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
            <v-btn color="#007aff" variant="text" append-icon="mdi-arrow-right">Переглянути</v-btn>
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
</template>

<script>
export default {
  data() {
    return {
      API: import.meta.env.VITE_API_URL,
      controller: new AbortController(),

      page: parseInt(this.$route.query.page) > 1 ? parseInt(this.$route.query.page) : 1,
      products: [],
      totalPages: null,

      createdLoading: false,

      error: null
    };
  },
  created() {
    this.createdLoading = true;
    this.loadProducts(this.page);
  },
  beforeUnmount() {
    document.getElementById('app').style.marginTop = '';
  },
  watch: {
    page() {
      this.loadProducts(this.page);
    },
    createdLoading() {
      document.getElementById('app').style.marginTop = this.createdLoading ? 'auto' : '';
    }
  },
  methods: {
    loadProducts(page) {
      this.controller.abort();
      this.controller = new AbortController();

      fetch(`${this.API}/products/?page=${page}`, {
        signal: this.controller.signal
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code !== 200) {
            this.error = `${data.code} — ${data.message}`;
            this.products = [];
            this.totalPages = null;
            return;
          }

          this.products = data.products;
          this.totalPages = data.totalPages;

          if (this.$route.name === 'MainPage') {
            this.$router.push({ query: { page: page } });
          }
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            return;
          }

          this.error = error;

          console.error(error);
        })
        .finally(() => {
          this.createdLoading = false;
        });
    }
  }
};
</script>
