<template>
  <form @submit.prevent="allInputsAreValid" id="idSignupForm" class="form">
    <div class="user-type-container">
      <base-radio
        v-model="type"
        name="type"
        value="Particular"
        :checked="true"
      />
      <base-radio v-model="type" name="type" value="ONG" />
    </div>
    <base-input
      v-model="fullName"
      name="fullName"
      id="fullName"
      placeholder="Nombre completo"
      :regex="regex.fullName"
      errorMsg="El campo Nombre no puede estar vacío, se debe introducir nombre y apellido, y no más de 30 caracteres"
    />
    <base-input
      v-if="type == 'Particular'"
      v-model="id"
      name="NID"
      id="NID"
      placeholder="DNI"
      :regex="regex.id"
      errorMsg="El campo DNI no puede estar vacío, y se deben introducir entre 8 y 20 dígitos"
    />
    <base-text-area
      v-else-if="type == 'ONG'"
      v-model="description"
      placeholder="Una breve descripción de tu organización..."
    />
    <base-select-option
      id="selectCountry"
      name="country"
      v-model="location.country"
      :options="countries"
      defaultValue="País"
      errorMsg="Debes seleccionar una opción válida"
    />
    <base-input
      v-model="location.province"
      name="province"
      id="province"
      placeholder="Provincia, ciudad o estado"
      errorMsg="La provincia no puede estar vacía, no puede contener números, y debe tener entre 1 y 30 caracteres"
      :regex="regex.province"
    />
    <base-input
      v-model="location.address"
      name="address"
      id="address"
      placeholder="Dirección"
      :regex="regex.address"
      errorMsg="La dirección puede tener los siguientes formatos: Rivadavia 504, Rivadavia, Calle Rivadavia 504, y debe contener entre 1 y 30 caracteres"
    />
    <base-input
      v-model="email"
      type="email"
      name="email"
      id="email"
      placeholder="Correo electrónico"
      :regex="regex.email"
      errorMsg="La dirección de correo introducida no es válida"
    />
    <base-input
      v-model="username"
      name="username"
      id="username"
      placeholder="Nombre de usuario"
      :regex="regex.username"
      errorMsg="El nombre de usuario debe contener entre 5 y 16 caracteres, y puede contener números, letras y los caracteres: _ y ."
    />
    <base-input
      v-model="password"
      type="password"
      name="password"
      id="password"
      placeholder="Contraseña"
      :regex="regex.password"
      errorMsg="La contraseña debe tener entre 8 y 16 caracteres, por lo menos un caracter especial, por lo menos una mayúscula y una minúscula y por lo menos un número"
    />
    <contact-form v-model="contact"></contact-form>
    <base-error-message
      :errorMsg="error.message.msg"
      :errorTitle="error.title"
      :class="error.visibility"
      @click="error.visibility = 'hidden'"
    ></base-error-message>
    <base-button
      name="submit-button"
      id="submit-button"
      class="submit"
      type="submit"
      buttonText="Registrarme"
      :isDisabled="false"
    />
  </form>
</template>

<script>
import axios from 'axios';

import ContactForm from './ContactForm.vue';
import BaseInput from './layout/BaseInput.vue';
import BaseTextArea from './layout/BaseTextArea.vue';
import BaseButton from './layout/BaseButton.vue';
import BaseRadio from './layout/BaseRadio.vue';
import BaseSelectOption from './layout/BaseSelectOption.vue';
import BaseErrorMessage from './layout/BaseErrorMessage.vue'

export default {
  components: {
    'contact-form': ContactForm,
    'base-input': BaseInput,
    'base-text-area': BaseTextArea,
    'base-button': BaseButton,
    'base-radio': BaseRadio,
    'base-select-option': BaseSelectOption,
    'base-error-message': BaseErrorMessage,
  },
  data() {
    return {
      error: {
        message: '',
        title: 'Error',
        visibility: 'hidden',
      },
      countries: undefined,
      userData: {},
      type: 'Particular',
      description: null,
      fullName: '',
      username: '',
      email: '',
      password: '',
      id: '',
      location: {
        country: '',
        province: '',
        address: '',
      },
      contact: {
        instagram: '',
        facebook: '',
        whatsapp: '',
      },
      errorMessages: [],
      regex: {
        username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,15}$/,
        fullName: /^([a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){1,30}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/,
        email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        address: /^[A-Za-zñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9'\.\-\s\,]{1,30}$/,
        id: /^([0-9]{8,20})$/,
        province: /^([a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){1,30}$/,
      },
    };
  },
  created() {
    this.getCountries();
  },

  methods: {
    getCountries() {
      const countriesURL = 'https://restcountries.eu/rest/v2/all';
      axios
        .get(countriesURL)
        .then((response) => {
          this.countries = response.data.map((country) => country.name);
        })
        .catch((error) => {
          this.showMessage('Error', error.response.data, 'block');
        });
    },
    allInputsAreValid() {
      if (this.validFields()) {
        this.createUserData();
        this.emitUserData();
      } else {
        let message =
          'Algunos de los campos ingresados no son correctos, asegurate de que ninguno se encuentre vacío';
        this.showMessage('Error', message, 'block');
      }
    },
    createUserData() {
      this.userData = {
        type: this.type,
        fullname: this.fullName.value,
        location: {
          country: this.location.country.value,
          city: this.location.province.value,
          address: this.location.address.value,
        },
        account: {
          username: this.username.value,
          email: this.email.value,
          password: this.password.value,
        },
        contact: [
          { contactType: 'whatsapp', value: this.contact.whatsapp.value },
          { contactType: 'facebook', value: this.contact.facebook.value },
          { contactType: 'instagram', value: this.contact.instagram.value },
        ],
      };
      if (this.type === 'Particular') {
        this.userData.NID = this.id.value;
      } else if (this.type === 'ONG') {
        this.userData.description = this.description.value;
      }
    },
    emitUserData() {
      const serverURL = 'http://localhost:3000/register';
      axios
        .post(serverURL, this.userData)
        .then((response) => {
          this.showMessage('Éxito', response.data.msg, 'block');
          document.getElementById('idSignupForm').reset();
          document.getElementById('submit-button').disabled = true;
          setTimeout(window.location.reload.bind(window.location), 2500);
        })
        .catch((error) => {
          this.showMessage('Error', error.response.data, 'block');
        });
    },
    validFields() {
      return (
        this.fullName.isValid &&
        this.username.isValid &&
        this.email.isValid &&
        this.password.isValid &&
        this.location.country.isValid &&
        this.location.province.isValid &&
        this.location.address.isValid &&
        this.contact.instagram.isValid &&
        this.contact.facebook.isValid &&
        this.contact.whatsapp.isValid &&
        (this.id.isValid ||
          (this.description.isValid && this.description.value.trim() !== ''))
      );
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
