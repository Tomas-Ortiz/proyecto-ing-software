<template>
  <div class="background">
    <the-profile></the-profile>
  </div>
</template>

<script>
import TheProfile from '../components/UI/TheProfile.vue'

export default {
  components: {
    'the-profile': TheProfile,
  },
  name: 'Profile',
};
</script>

<style lang="postcss" scoped>
.signup-background {
    @apply absolute w-screen min-h-screen;
}
</style>
