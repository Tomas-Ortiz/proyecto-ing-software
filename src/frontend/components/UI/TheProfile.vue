<template>
  <div class="profile-container">
    <div class="photos-container">
      <profile-photo></profile-photo>
    </div>
    <div class="fields-container">
      <profile-fields></profile-fields>
    </div>
    <div class="contacts-container">
      <profile-contact></profile-contact>
    </div>
  </div>
</template>

<script>
import BaseProfileContact from '../layout/profile/BaseProfileContact.vue';
import BaseProfileFields from '../layout/profile/BaseProfileFields.vue';
import BaseProfilePhoto from '../layout/profile/BaseProfilePhoto.vue';

export default {
  components: {
    'profile-contact': BaseProfileContact,
    'profile-fields': BaseProfileFields,
    'profile-photo': BaseProfilePhoto,
  },
}
</script>

<style lang="postcss" scoped>
.profile-container {
  @apply h-full grid grid-rows-3 md:grid-rows-none md:grid-cols-12;
  /* @apply min-w-full bg-purple-400; */
}
.photos-container {
  @apply md:col-span-3;
  /* @apply bg-red-200; */
}
.fields-container {
  @apply md:border-l-4 md:border-r-4 md:col-span-6;
  /* @apply bg-yellow-200 border-pink-800; */
}
.contacts-container {
  @apply md:col-span-3;
  /* @apply bg-blue-200; */
}
</style>
