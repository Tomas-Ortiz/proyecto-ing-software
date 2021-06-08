<template>
  <div class="fields-container">

    <div class="container-title">
      <h1>Información de la Cuenta:</h1>
    </div>

    <div class="field">
      <label
        class="field-label"
        for="name">
        Nombre:
      </label>
      <base-input
        v-model="newFullName"
        class="field-input"
        id="name"
        name="name"
        :placeholder="name"
        :regex="regex.fullName"
        @keyup="emitInputValue"
      />
    </div>

    <div class="field" v-if="type === 'Particular'">
      <label
        class="field-label"
        for="id">
        DNI:
      </label>
      <base-input
        v-model="newNID"
        class="field-input"
        id="id"
        name="id"
        :placeholder="NID"
        :regex="regex.id"
        @keyup="emitInputValue"
      />
    </div>

    <div class="field" v-else-if="type === 'ONG'">
      <label
        class="field-label"
        for="description">
        Descripción:
      </label>
      <base-input
        v-model="newDescription"
        class="field-input"
        id="description"
        name="description"
        placeholder="Una breve descripción de tu organización..."
        @keyup="emitInputValue"
      />
    </div>

    <div class="field">
      <label
        class="field-label"
        for="country">
        País:
      </label>
      <select-option
        v-model="newCountry"
        class="field-input"
        id="selectCountry"
        name="country"
        :options="countries"
        :defaultValue="location.country"
        errorMsg="Debes seleccionar una opción válida"
        @change="emitInputValue"
      />
    </div>

    <div class="field">
      <label
        class="field-label"
        for="city">
        Provincia:
      </label>
      <base-input
        v-model="newCity"
        class="field-input"
        id="city"
        name="city"
        :placeholder="location.city"
        :regex="regex.city"
        @keyup="emitInputValue"
      />
    </div>

    <div class="field">
      <label
        class="field-label"
        for="address">
        Dirección:
      </label>
      <base-input
        v-model="newAddress"
        class="field-input"
        id="address"
        name="address"
        :placeholder="location.address"
        :regex="regex.address"
        @keyup="emitInputValue"
      />
    </div>

    <div class="field">
      <label
        class="field-label"
        for="mail">
        Email:
      </label>
      <base-input
        v-model="newEmail"
        class="field-input"
        id="email"
        name="email"
        :placeholder="email"
        :regex="regex.email"
        @keyup="emitInputValue"
      />
    </div>

    <div class="field">
      <label
        class="field-label"
        for="username">
        Username:
      </label>
      <base-input
        v-model="newUsername"
        class="field-input"
        id="username"
        name="username"
        :placeholder="username"
        :regex="regex.username"
        @keyup="emitInputValue"
      />
    </div>

    <div class="field">
      <label
        class="field-label"
        for="password">
        Contraseña:
      </label>
      <base-input
        v-model="newPassword"
        class="field-input"
        id="password"
        name="password"
        placeholder="Cambiar Contraseña"
        :regex="regex.password"
        @keyup="emitInputValue"
      />
    </div>

    <div class="update-button">
      <base-button
        buttonText="Actualizar datos"
        :isDisabled="true"
        disabledText="Actualizar datos"
      ></base-button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

import BaseInput from '../BaseInput.vue';
import BaseSelectOption from '../BaseSelectOption.vue';
import BaseButton from '../BaseButton.vue';

export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    NID: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  components: {
    'base-input': BaseInput,
    'select-option': BaseSelectOption,
    'base-button': BaseButton,
  },
  mounted() {
    this.user = this.userData;
  },
  data() {
    return {
      newNID: null,
      newDescription: null,
      newFullName: null,
      newUsername: null,
      newPassword: null,
      newEmail: null,
      newCountry: null,
      newCity: null,
      newAddress: null,
      user: {},
      countries: null,
      regex: {
        username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,15}$/,
        fullName: /^([a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){1,30}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/,
        email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        address: /^[A-Za-zñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9'\.\-\s\,]{1,30}$/,
        id: /^([0-9]{8,20})$/,
        city: /^([a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){1,30}$/,
      },
    }
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
    emitInputValue() {
      this.inputIsUpdated(this.newNID, 'NID');
      this.inputIsUpdated(this.newDescription, 'description');
      this.inputIsUpdated(this.newFullName, 'fullname');
      this.inputIsUpdated(this.newUsername, 'username', true, 'account');
      this.inputIsUpdated(this.newPassword, 'password', true, 'account');
      this.inputIsUpdated(this.newEmail, 'email', true, 'account');
      this.inputIsUpdated(this.newCountry, 'country', true, 'location');
      this.inputIsUpdated(this.newCity, 'city', true, 'location');
      this.inputIsUpdated(this.newAddress, 'address', true, 'location');
      this.$emit('update:modelValue', this.user);
    },
    inputIsUpdated(input, propertyName, propertyIsObject = false, objectName = '') {
      if (input) {
        if (input.value !== '' && input.isValid) {
          if (!propertyIsObject) {
            this.user[propertyName] = input.value;
          } else {
            this.user[objectName][propertyName] = input.value;
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if (!propertyIsObject) {
            this.user[propertyName] = this.userData[propertyName];
          } else {
            this.user[objectName][propertyName] = this.userData[objectName][propertyName];
          }
        }
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.fields-container {
  @apply mt-7 border-none lg:px-40;
}
.container-title {
  @apply text-xl font-bold text-pink-900;
  @apply border-b-2 border-pink-900 w-max mx-auto;
}
.field {
  @apply w-full md:mx-5 lg:mx-10 mt-5;
}
.field-input {
  @apply border-b-0 w-7/12 mx-0;
}
option {
  @apply w-7/12;
}
.field-label {
  @apply w-5/12 font-semibold text-xl;
}
.update-button {
  @apply w-full text-center mt-4;
}
.field-input,
.field-label,
.update-button {
  @apply inline-block;
}
</style>
