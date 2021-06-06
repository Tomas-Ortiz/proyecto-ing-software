<template>
  <div class="login-background">
    <the-login></the-login>
  </div>
</template>

<script>
import TheLogin from '../components/UI/TheLogin.vue';

export default {
  components: {
    'the-login': TheLogin,
  },
  name: 'Login',
};
</script>

<style lang="postcss" scoped>
.login-background {
  @apply bg-gradient-to-tr from-pink-900 via-red-900 to-red-900;
  @apply absolute w-full min-h-screen overflow-hidden;
}
</style>
