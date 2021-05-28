<template>
  <div class="home">
    <the-banner></the-banner>
  </div>
</template>

<script>
import TheBanner from '../components/UI/TheBanner.vue';

export default {
  components: {
    'the-banner': TheBanner,
  },
  name: 'Home',
};
</script>

<style lang="postcss" scoped>
.home {
  @apply flex h-screen justify-center items-center;
}
</style>
