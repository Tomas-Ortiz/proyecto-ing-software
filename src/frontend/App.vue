<template>
  <div>
    <div id="nav">
      <router-link to="/">Inicio</router-link> |
      <router-link to="/about">¿Quiénes somos?</router-link> |
      <router-link to="/signup">Registrarse</router-link> |
      <router-link to="/create-post">Dar en adopción</router-link> |
      <router-link to="/profile/test-id">Perfil</router-link>
    </div>
    <div class="h-full">
      <router-view></router-view>
    </div>
    <!-- <the-footer></the-footer> -->
  </div>
</template>
<script>
import TheFooter from './components/UI/TheFooter.vue';

export default {
  components: {
    'the-footer': TheFooter,
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
