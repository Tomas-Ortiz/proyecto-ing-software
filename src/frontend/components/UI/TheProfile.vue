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
// import axios from 'axios'

import BaseProfileContact from '../layout/profile/BaseProfileContact.vue';
import BaseProfileFields from '../layout/profile/BaseProfileFields.vue';
import BaseProfilePhoto from '../layout/profile/BaseProfilePhoto.vue';

export default {
  components: {
    'profile-contact': BaseProfileContact,
    'profile-fields': BaseProfileFields,
    'profile-photo': BaseProfilePhoto,
  },
  data() {
    return {
      user: null,
      error: []
    }
  },
  // created() {
  //   console.log('Getting the User...');
  //   this.getUser();
  //   console.log(this.user);
  // },
  // methods: {
  //   getUser() {
  //     const countriesURL = 'localhost:3000/getUser/asd';
  //     axios
  //       .get(countriesURL)
  //       .then((response) => {
  //         this.user = response.data.map((country) => country.name);
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       });
  //   }
  // },
}
</script>

<style lang="postcss" scoped>
.profile-container {
  @apply h-full grid md:grid-rows-none md:grid-cols-12 md:mx-0 mx-10;
}
.photos-container {
  @apply md:col-span-3;
}
.fields-container {
  @apply md:border-l-4 md:border-r-4 md:border-pink-900 md:col-span-6;
}
.contacts-container {
  @apply md:col-span-3;
}
</style>
