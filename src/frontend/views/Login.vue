<template>
  <div class="login">
    <the-login></the-login>
  </div>
</template>

<script>
import TheLogin from '../components/UI/TheLogin.vue';

export default {
  components: {
    'the-login': TheLogin
  },
  name: 'Login',

};
</script>

<style lang="postcss" scoped>
.login {
  @apply flex h-screen justify-center items-center;
}
</style>
