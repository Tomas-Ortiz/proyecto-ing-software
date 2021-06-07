import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';

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
    component: () => import('../views/About.vue'),
    meta: { title: `${nameApp} - Acerca de nosotros` },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { title: `${nameApp} - Registrate` },
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: () => import('../views/PostCreation.vue'),
    meta: { title: `${nameApp} - Crea tu publicación` },
  },
  {
    path: '/post/:id',
    name: 'PostDetails',
    component: () => import('../views/PostDetails.vue'),
    meta: { title: `${nameApp} - Detalles publicación` },
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue'),
    meta: { title: `${nameApp} - Página no encontrada` },
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { title: `${nameApp} - Perfil` },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: `${nameApp} - Iniciá sesión` },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue'),
    meta: { title: nameApp },
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
