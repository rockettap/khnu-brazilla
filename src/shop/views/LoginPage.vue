<template>
  <h1 class="mt-6" v-if="error">{{ error }}</h1>
  <v-sheet v-else class="mx-auto mt-6" max-width="746.66">
    <v-form fast-fail @submit.prevent="login" v-model="valid">
      <v-text-field
        class="mb-4"
        v-model="username"
        hide-details="auto"
        :rules="[required]"
        label="Ім'я"
      ></v-text-field>
      <v-text-field
        class="mb-4"
        v-model="password"
        hide-details="auto"
        :rules="[required]"
        label="Пароль"
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
        :disabled="!valid"
      >
        Увійти
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { useAdminStore } from '../stores';
const store = useAdminStore();

export default {
  data() {
    return {
      API: import.meta.env.VITE_API_URL,

      username: '',
      password: '',

      loading: false,

      valid: false,

      error: null
    };
  },
  methods: {
    login() {
      if (!this.valid) return;

      this.loading = true;

      const formData = new URLSearchParams();
      formData.append('username', this.username);
      formData.append('password', this.password);

      fetch(`${this.API}/login/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code !== 200) {
            store.isAdmin = false;
            return;
          }

          store.isAdmin = true;

          this.getContacts();
          this.getOrders();

          if (this.$route.path === '/login') this.$router.push('/admin');
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getContacts() {
      fetch(`${this.API}/contacts/`, {
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code !== 200) {
            store.isAdmin = false;
            return;
          }

          store.isAdmin = true;
          if (data.messages) store.contactItems = data.messages;

          if (this.$route.path === '/login') this.$router.push('/admin');
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getOrders() {
      fetch(`${this.API}/orders/`, {
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code !== 200) {
            store.isAdmin = false;
            return;
          }

          store.isAdmin = true;
          if (data.orders) store.orderItems = data.orders;

          if (this.$route.path === '/login') this.$router.push('/admin');
        })
        .catch((error) => {
          console.error(error);
        });
    },
    required(value) {
      return !!value.trim() || "Поле є обов'язковим";
    }
  },
  created() {
    this.getContacts();
    this.getOrders();
  }
};
</script>
