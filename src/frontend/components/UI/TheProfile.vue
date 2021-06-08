<template>
  <div class="profile-container">
    <div class="photos-container">
      <profile-photo></profile-photo>
    </div>
    <div class="fields-container">
      <profile-fields
        v-if="user"
        :userData="user"
        :name="user.fullname"
        :location="user.location"
        :email="user.account.email"
        :username="user.account.username"
        :NID="user.NID"
        :description="user.description"
        :type="user.type"
        :password="user.account.password"
        v-model="userData"
        @keyup="updateUserData"
      ></profile-fields>
    </div>
    <div class="contacts-container">
      <profile-contact
        v-if="user"
        :contactInfo="user.contact"
        v-model="contactData"
        @change="updateUserData"
      ></profile-contact>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
      userData: null,
      contactData: null,
      error: []
    }
  },
  created() {
    console.log('Getting the User...');
    this.getUser();
  },
  methods: {
    tokenExists() {
      return localStorage.getItem('token') || 0;
    },
    getUser() {
      if (this.tokenExists()) {
        const getUserURL = 'http://localhost:3000/getUser';
        const config = {
          headers: {
            // eslint-disable-next-line quote-props
            'token': this.tokenExists(),
          }
        }
        axios
          .get(getUserURL, config)
          .then((response) => {
            this.user = response.data.msg;
            console.log(this.user);
          })
          .catch((error) => {
            console.log(error)
          });
      } else {
        this.redirectUser();
      }
    },
    updateUser() {
      if (this.tokenExists()) {
        const updateUserURL = 'http://localhost:3000/updateProfile'
        this.user = this.userData;
        this.user.contact = this.contactData;
        // console.log('EMITING THE FOLLOWING USER');
        // console.log(this.user);
        // axios.put(updateUserURL, )
      }
    },
    updateUserData() {
      this.formUserData();
    },
    formUserData() {
      if (this.userData && this.contactData) {
        const merged = { ...this.userData, ...this.contactData };
        console.log('MERGED!');
        console.log(merged);
      }
    },
    redirectUser() {
      this.$router.push('/');
    },
  },
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
