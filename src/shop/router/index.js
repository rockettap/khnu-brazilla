import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import ProductPage from '../views/ProductPage.vue';
import CartPage from '../views/CartPage.vue';
import NotFound from '../views/NotFound.vue';

import { useAdminStore } from '../stores';

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
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue'),
    beforeEnter: (to, from, next) => {
      const isAdmin = useAdminStore().isAdmin;
      if (isAdmin) {
        next({ name: 'AdminPage' });
      } else {
        next();
      }
    }
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: () => import('../views/AdminPage.vue'),
    beforeEnter: (to, from, next) => {
      const isAdmin = useAdminStore().isAdmin;
      if (isAdmin) {
        next();
      } else {
        next({ name: 'LoginPage' });
      }
    }
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

router.beforeEach((to, from, next) => {
  if (to.name === 'LoginPage') {
    document.getElementById('app').style.marginTop = 'auto';
  } else {
    document.getElementById('app').style.marginTop = '';
  }
  next();
});
export default router;
