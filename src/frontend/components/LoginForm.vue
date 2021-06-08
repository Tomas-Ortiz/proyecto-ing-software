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
      errorMsg="La contraseña no puede estar vacía"
    />
    <base-error-message
      :errorMsg="error.message"
      :errorTitle="error.title"
      :class="error.visibility"
      @click="error.visibility = 'hidden'"
    ></base-error-message>
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
import BaseErrorMessage from './layout/BaseErrorMessage.vue';

export default {
  components: {
    'base-input': BaseInput,
    'base-button': BaseButton,
    'base-error-message': BaseErrorMessage,
  },
  // Si el usuario ya está logueado se lo devuelve al home
  created() {
    this.userAlreadyLogged();
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
          this.showMessage('Éxito', response.data.msg, 'block');
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
    userAlreadyLogged() {
      if (localStorage.getItem('token')) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.form {
  @apply grid grid-rows-1;
}
</style>
