import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Pinia
import { createPinia } from 'pinia';
const pinia = createPinia();

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives
});

createApp(App).use(router).use(pinia).use(vuetify).mount('#app');
