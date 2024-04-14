import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import ProductPage from '../views/ProductPage.vue';
import CartPage from '../views/CartPage.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
