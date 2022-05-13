import { createRouter, createWebHistory } from 'vue-router';

import Login from './../pages/Login';
import Weather from './../pages/Weather';

const routes = [
  {
    path: '/',
    name: 'Weather',
    beforeEnter(to, from, next) {
      if (!localStorage.getItem('authenticated')) {
        console.log('EXECUED');
        next({
          path: '/login',
        });
      } else {
        console.log('SHOULDNT EXECUTED');
        next();
      }
    },
    component: Weather,
  },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
