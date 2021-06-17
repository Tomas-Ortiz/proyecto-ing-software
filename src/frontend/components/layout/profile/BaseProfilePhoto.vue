<template>
  <div class="photo-container">
    <img
      class="profile-photo"
      src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      alt="Profile image"
    />
  </div>
</template>

<script>
import BaseButton from '../BaseButton.vue';

export default {
  components: {
    'base-button': BaseButton,
  },
};
</script>

<style lang="postcss" scoped>
.photo-container {
  @apply w-full mt-7 md:grid md:grid-rows-3;
}
.profile-photo {
  @apply mx-auto block object-cover object-center;
  @apply w-48 h-48 rounded-full cursor-pointer;
}
</style>
