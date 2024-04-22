<template>
  <h1 v-if="error">{{ error }}</h1>

  <template v-else>
    <h1 class="mb-6">Створити</h1>
    <v-sheet max-width="746.66">
      <v-form fast-fail @submit.prevent="createProduct" v-model="valid">
        <v-file-input
          clearable
          accept="image/png, image/jpeg"
          hide-details="auto"
          :rules="[filesRule]"
          v-model="files"
          label="Файл"
          class="mb-4"
        ></v-file-input>
        <v-text-field
          class="mb-4"
          v-model="name"
          hide-details="auto"
          :rules="[requiredRule]"
          label="Назва"
        ></v-text-field>
        <v-text-field
          class="mb-4"
          v-model="price"
          hide-details="auto"
          :rules="[requiredRule]"
          label="Ціна"
        ></v-text-field>
        <v-textarea
          class="mb-4"
          v-model="description"
          hide-details="auto"
          :rules="[requiredRule]"
          label="Опис"
        ></v-textarea>
        <v-btn
          class="mt-2"
          type="submit"
          block
          size="large"
          color="#007aff"
          variant="flat"
          rounded="xl"
          :loading="loading"
          :disabled="!valid"
        >
          Створити
        </v-btn>
      </v-form>
    </v-sheet>

    <v-sheet max-width="746.66" class="mt-6">
      <v-select
        label="Таблиця"
        :items="['Контакти', 'Замовлення']"
        hide-details="auto"
        v-model="selected"
      ></v-select>
    </v-sheet>

    <template v-if="selected === 'Контакти'">
      <h1 class="my-6">Контакти</h1>
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
    </template>

    <template v-if="selected === 'Замовлення'">
      <h1 class="my-6">Замовлення</h1>
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

      selected: null,

      files: [],
      name: '',
      price: '',
      description: '',

      valid: false,

      loading: false,

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
    createProduct() {
      if (!this.valid) return;

      this.loading = true;

      const formData = new FormData();
      formData.append('file', this.files[0]);
      formData.append('name', this.name);
      formData.append('price', this.price);
      formData.append('description', this.description);

      const requestOptions = {
        method: 'POST',
        body: formData,
        credentials: 'include'
      };

      fetch(`${this.API}/products/`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.code !== 201) {
            return;
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatTimestamp(timestamp) {
      return new Date(timestamp * 1000).toLocaleString();
    },
    formatProducts(products) {
      return products.map((product) => product.name).join(', ');
    },
    requiredRule(value) {
      return !!value.trim() || "Поле є обов'язковим";
    },
    filesRule(value) {
      return !!value.length || "Поле є обов'язковим";
    }
  }
};
</script>
