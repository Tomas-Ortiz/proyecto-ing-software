<template>
  <form @submit.prevent="allInputsAreValid" id="idLoginForm" class="form">
    <base-input
      v-model="email"
      type="email"
      name="email"
      id="email"
      placeholder="Correo electrónico"
      :regex="regex.email"
      errorMsg="El formato del correo introducido no es válido"
    />
    <base-input
      v-model="password"
      type="password"
      name="password"
      id="password"
      placeholder="Contraseña"
      :regex="regex.password"
    />
    <div
      :class="['error-message-container', error.visibility, error.title]"
      role="alert"
    >
      <strong class="font-bold">{{ error.title }}!</strong><br />
      <span class="error-message">{{ error.message }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="error.visibility = 'hidden'"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
    <base-button
      name="submit-button"
      id="submit-button"
      class="submit"
      type="submit"
      buttonText="Ingresar"
      :isDisabled="false"
    />
  </form>
</template>

<script>
import axios from 'axios';

import BaseInput from './layout/BaseInput.vue';
import BaseButton from './layout/BaseButton.vue';

export default {
  components: {
    'base-input': BaseInput,
    'base-button': BaseButton,
  },
  data() {
    return {
      error: {
        message: '',
        title: 'Error',
        visibility: 'hidden',
      },
      account: {},
      email: '',
      password: '',
      regex: {
        password: /./,
        email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
    };
  },
  methods: {
    allInputsAreValid() {
      if (this.validFields()) {
        this.createUserData();
        this.sendUserData();
      } else {
        let message =
          'Algunos de los campos ingresados no son correctos, asegurate de que ninguno se encuentre vacío';
        this.showMessage('Error', message, 'block');
      }
    },
    createUserData() {
      this.account = {
        email: this.email.value,
        password: this.password.value,
      };
    },
    sendUserData() {
      const loginURL = 'http://localhost:3000/login';
      axios
        .post(loginURL, this.account)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          this.showMessage('Éxito', response.data, 'block');
          this.$router.push('/');
        })
        .catch((error) => {
          this.showMessage('Error', error.response.data.msg, 'block');
        });
    },
    validFields() {
      return this.email.isValid && this.password.isValid;
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
.form {
  @apply grid grid-rows-1;
}
.error-message-container {
  @apply bg-red-100 border border-red-400 text-red-700;
  @apply w-4/5 mx-auto px-4 py-3 rounded relative;
}
.error-message {
  @apply block sm:inline;
}
.Error {
  @apply bg-red-100 border-red-400 text-red-700;
}
.Éxito {
  @apply bg-green-100 border-green-400 text-green-700;
}
</style>
