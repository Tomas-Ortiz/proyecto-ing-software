<template>
  <div class="postDetails-background">
    <the-header></the-header>
    <the-post-details></the-post-details>
  </div>
</template>

<script>
import ThePostDetails from '../components/UI/ThePostDetails.vue';
import TheHeader from '../components/UI/TheHeader.vue';

export default {
  components: {
    'the-post-details': ThePostDetails,
    'the-header': TheHeader,
  },
  name: 'PostDetails',
};
</script>

<style lang="postcss" scoped>
/*
.postDetails-background {
  @apply bg-gradient-to-tr from-pink-900 via-red-900 to-red-900;
  @apply absolute w-full min-h-screen overflow-hidden;
}
*/
.router {
  @apply text-3xl font-bold text-gray-200;
  @apply align-middle h-full;
}
.slot.router {
  @apply text-xl font-semibold my-1;
}
</style>
