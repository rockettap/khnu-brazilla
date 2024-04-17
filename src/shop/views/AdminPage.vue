<template>
  <h1 class="mt-6" v-if="error">{{ error }}</h1>
  <template v-else>
    <h1 class="mt-6 mb-6">Контакти</h1>
    <v-data-table-virtual
      loading-text="Завантаження..."
      :headers="contactHeaders"
      :items="contactItems"
      :height="contactItems.length > 6 ? '420px' : 'initial'"
      :loading="contactLoading"
    >
      <template v-slot:item.timestamp="{ item }">
        {{ formatTimestamp(item.timestamp) }}
      </template>
    </v-data-table-virtual>
    <h1 class="mt-6 mb-6">Замовлення</h1>
    <v-data-table-virtual
      loading-text="Завантаження..."
      :headers="orderHeaders"
      :items="orderItems"
      :height="orderItems.length > 6 ? '420px' : 'initial'"
      :loading="orderLoading"
    >
      <template v-slot:item.products="{ item }">
        {{ formatProducts(item.products) }}
      </template>
    </v-data-table-virtual>
  </template>
</template>

<script>
import { useAdminStore } from '../stores';
const store = useAdminStore();

export default {
  data() {
    return {
      API: import.meta.env.VITE_API_URL,

      contactHeaders: [
        { title: "Ім'я", sortable: false, key: 'name', align: 'start' },
        { title: 'Електронна пошта', key: 'email', align: 'start' },
        { title: 'Повідомлення', sortable: false, key: 'message', align: 'start' },
        { title: 'Час', key: 'timestamp', align: 'end' }
      ],
      search: '',

      orderHeaders: [
        { title: "Ім'я", sortable: false, key: 'name', align: 'start' },
        { title: 'Електронна пошта', key: 'email', align: 'start' },
        { title: 'Поштовий індекс', sortable: false, key: 'postcode', align: 'end' },
        { title: 'Товари', sortable: false, key: 'products', align: 'start' }
      ],
      search: '',

      error: null
    };
  },
  computed: {
    contactItems() {
      return store.contactItems;
    },
    orderItems() {
      return store.orderItems;
    },
    contactLoading() {
      return !this.contactItems.length;
    },
    orderLoading() {
      return !this.orderItems.length;
    }
  },
  methods: {
    formatTimestamp(timestamp) {
      return new Date(timestamp * 1000).toLocaleString();
    },
    formatProducts(products) {
      return products.map((product) => product.name).join(', ');
    }
  }
};
</script>
