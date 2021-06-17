<template>
  <div class="background">
    <the-header></the-header>
    <the-profile></the-profile>
  </div>
</template>

<script>
import TheProfile from '../components/UI/TheProfile.vue';
import TheHeader from '../components/UI/TheHeader.vue';

export default {
  components: {
    'the-profile': TheProfile,
    'the-header': TheHeader,
  },
  name: 'Profile',
};
</script>

<style lang="postcss" scoped>
/* .background {
  @apply absolute w-screen min-h-screen;
} */
.router {
  @apply text-3xl font-bold text-gray-200;
  @apply align-middle h-full;
}
.slot.router {
  @apply text-xl font-semibold my-1;
}
</style>
