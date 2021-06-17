<template>
  <div class="signup-background">
    <the-signup></the-signup>
  </div>
</template>

<script>
import TheSignup from '../components/UI/TheSignup.vue';

export default {
  components: {
    'the-signup': TheSignup,
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
