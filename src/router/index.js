import { createRouter, createWebHistory } from 'vue-router';
import { useCookies } from 'vue3-cookies';

import Login from '@/pages/Login';
import Weather from '@/pages/Weather';

const { cookies } = useCookies();

const routes = [
  {
    path: '/',
    name: 'Weather',
    beforeEnter(to, from, next) {
      if (!cookies.get('auth-token')) {
        next({
          path: '/login',
        });
      } else {
        next();
      }
    },
    component: Weather,
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter(to, from, next) {
      if (cookies.get('auth-token')) {
        next({
          path: '/',
        });
      } else {
        next();
      }
    },
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
