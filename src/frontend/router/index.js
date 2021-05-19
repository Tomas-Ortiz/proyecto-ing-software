import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Profile from '../views/Profile.vue';

const nameApp = 'Puppers';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: nameApp },
  },
  {
    path: '/about',
    name: 'About',
    // Carga diferida: solo se carga el componente cuando se accede a la ruta
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { title: `${nameApp} - About Us` },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { title: `${nameApp} - Registrarse` },
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
