<template>
  <div class="profile-container">
    <div class="photos-container">
      <profile-photo></profile-photo>
      <base-button
        buttonText="Eliminar Cuenta"
        class="delete-account-btn"
        @click="deleteAccount"
      >
      </base-button>
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
      ></profile-fields>
      <base-error-message
        class="text-center"
        :errorMsg="error.message"
        :errorTitle="error.title"
        :class="error.visibility"
        @click="error.visibility = 'hidden'"
      ></base-error-message>
      <div class="update-button">
        <base-button
          id="submit-button"
          buttonText="Actualizar datos"
          disabledText="Actualizar datos"
          @click="sendNewUser"
        ></base-button>
      </div>
    </div>
    <div class="contacts-container">
      <profile-contact
        v-if="user"
        :contactInfo="user.contact"
        v-model="contactData"
      ></profile-contact>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import BaseProfileContact from '../layout/profile/BaseProfileContact.vue';
import BaseProfileFields from '../layout/profile/BaseProfileFields.vue';
import BaseProfilePhoto from '../layout/profile/BaseProfilePhoto.vue';
import BaseButton from '../layout/BaseButton.vue';
import BaseErrorMessage from '../layout/BaseErrorMessage.vue';

export default {
  components: {
    'profile-contact': BaseProfileContact,
    'profile-fields': BaseProfileFields,
    'profile-photo': BaseProfilePhoto,
    'base-button': BaseButton,
    'base-error-message': BaseErrorMessage,
  },
  created() {
    this.getUser();
  },
  data() {
    return {
      user: null,
      userData: null,
      contactData: null,
      error: {
        message: '',
        title: 'Error',
        visibility: 'hidden',
      },
    };
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
            Authorization: this.tokenExists(),
          },
        };
        axios
          .get(getUserURL, config)
          .then((response) => {
            this.user = response.data.msg;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.redirectUser();
      }
    },
    sendNewUser() {
      if (this.tokenExists()) {
        if (this.userWasUpdated() || this.contactWasUpdated()) {
          const updateUserURL = 'http://localhost:3000/updateProfile';
          axios
            .put(updateUserURL, this.user)
            .then((response) => {
              this.getUser();
              this.showMessage('Éxito', response.data.msg, 'block');
              document.getElementById('submit-button').disabled = true;
              setTimeout(() => window.location.reload(), 1000);
            })
            .catch((error) => {
              this.showMessage('Error', error.response.data, 'block');
            });
        } else {
          this.showMessage('Error', 'No hay nada para actualizar', 'block');
        }
      }
    },
    redirectUser() {
      this.$router.push({ name: 'Login' });
    },
    userWasUpdated() {
      if (this.userData != null) {
        this.user = this.userData;
        return true;
      }
      return false;
    },
    contactWasUpdated() {
      if (this.contactData != null) {
        this.user.contact = this.contactData;
        return true;
      }
      return false;
    },
    deleteAccount() {
      if (this.tokenExists()) {
        const deleteAccountURL = 'http://localhost:3000/deleteAccount';
        const config = {
          headers: {
            Authorization: this.tokenExists(),
          },
        };
        axios
          .delete(deleteAccountURL, config)
          .then(() => {
            this.deleteUserToken();
            this.redirectUser();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deleteUserToken() {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
    },
    showMessage(title, msg, visibility) {
      this.error.title = title;
      this.error.message = msg;
      this.error.visibility = visibility;
    },
  },
};
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
.update-button {
  @apply w-full text-center mt-4;
  @apply inline-block;
}
.delete-account-btn {
  @apply w-5/12 md:w-4/5;
  @apply block mx-auto my-2 bg-red-500 md:row-start-4;
}
</style>
