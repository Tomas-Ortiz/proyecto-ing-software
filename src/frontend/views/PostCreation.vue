<template>
  <div class="postCreation-background">
    <the-post-creation></the-post-creation>
  </div>
</template>

<script>
import ThePostCreation from '../components/UI/ThePostCreation.vue';

export default {
  components: {
    'the-post-creation': ThePostCreation,
  },
  name: 'PostCreation',
};
</script>

<style lang="postcss" scoped>
.postCreation-background {
  @apply bg-gradient-to-tr from-red-400 via-pink-800 to-pink-900;
  @apply absolute w-screen min-h-screen;
}
</style>
