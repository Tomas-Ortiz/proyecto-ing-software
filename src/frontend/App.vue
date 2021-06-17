<template>
  <div>
    <div id="nav">
      <router-link to="/">Inicio</router-link> |
      <router-link to="/about">¿Quiénes somos?</router-link> |
      <router-link to="/signup">Registrarse</router-link> |
      <router-link to="/create-post">Publicar</router-link> |
      <router-link to="/profile">Perfil</router-link> |
      <router-link to="/login">Iniciar sesión</router-link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        role="button"
        viewBox="0 0 20 20"
        fill="currentColor"
        @click="logout"
      >
        <path
          fill-rule="evenodd"
          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="h-full">
      <router-view></router-view>
    </div>
    <!-- <the-footer></the-footer> -->
  </div>
</template>
<script>
import axios from 'axios';

import TheFooter from './components/UI/TheFooter.vue';

export default {
  components: {
    'the-footer': TheFooter,
  },
  methods: {
    logout() {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  @apply z-30 p-3 w-full text-center bg-pink-600;
}
#nav a {
  @apply font-bold text-gray-200;
}
#nav a.router-link-exact-active {
  @apply text-red-400;
}
</style>
