<template>
  <div class="signup-background">
    <the-signup></the-signup>
    <!-- <the-login></the-login> -->
  </div>
</template>

<script>
import TheSignup from '../components/UI/TheSignup.vue';
// import TheLogin from '../components/UI/TheLogin.vue'

export default {
  components: {
    'the-signup': TheSignup,
    // 'the-login': TheLogin,
  },
  name: 'Signup',
};
</script>

<style lang="postcss" scoped>
.signup-background {
  @apply bg-gradient-to-tr from-red-400 via-pink-800 to-pink-900;
  @apply absolute w-full min-h-screen;
}
</style>
