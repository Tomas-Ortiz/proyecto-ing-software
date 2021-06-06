<template>
  <div class="fields-container">
    <div class="container-title">
      <h1>Información de la Cuenta:</h1>
    </div>

    <div class="field">
      <label class="field-label" for="name">
        Nombre:
      </label>
      <base-input
        v-model="user.fullName"
        class="field-input"
        id="name"
        name="name"
        placeholder="Nombre Completo"
        :regex="regex.fullName"
      />
    </div>

    <div class="field" v-if="user.type === 'Particular'">
      <label class="field-label" for="id">
        DNI:
      </label>
      <base-input
        v-model="user.NID"
        class="field-input"
        id="id"
        name="id"
        placeholder="DNI"
        :regex="regex.id"
      />
    </div>

    <div class="field" v-else-if="user.type === 'ONG'">
      <label class="field-label" for="description">
        Descripción:
      </label>
      <base-input
        v-model="user.description"
        class="field-input"
        id="description"
        name="description"
        placeholder="Una breve descripción de tu organización..."
      />
    </div>

    <div class="field">
      <label class="field-label" for="country">
        País:
      </label>
      <select-option
        class="field-input"
        id="selectCountry"
        name="country"
        :options="countries"
        defaultValue="País"
        errorMsg="Debes seleccionar una opción válida"
      />
    </div>

    <div class="field">
      <label class="field-label" for="province">
        Provincia:
      </label>
      <base-input
        v-model="user.location.province"
        class="field-input"
        id="province"
        name="province"
        placeholder="Provincia, ciudad o estado"
        :regex="regex.province"
      />
    </div>

    <div class="field">
      <label class="field-label" for="address">
        Dirección:
      </label>
      <base-input
        v-model="user.location.address"
        class="field-input"
        id="address"
        name="address"
        placeholder="Dirección"
        :regex="regex.address"
      />
    </div>

    <div class="field">
      <label class="field-label" for="mail">
        Email:
      </label>
      <base-input
        v-model="user.email"
        class="field-input"
        id="email"
        name="email"
        placeholder="Correo electrónico"
        :regex="regex.email"
      />
    </div>

    <div class="field">
      <label class="field-label" for="username">
        Username:
      </label>
      <base-input
        v-model="user.username"
        class="field-input"
        id="username"
        name="username"
        placeholder="Nombre de usuario"
        :regex="regex.username"
      />
    </div>

    <div class="field">
      <label class="field-label" for="password">
        Contraseña:
      </label>
      <base-input
        v-model="user.password"
        class="field-input"
        id="password"
        name="password"
        placeholder="Contraseña"
        :regex="regex.password"
      />
    </div>

    <div class="update-button">
      <base-button buttonText="Actualizar"> </base-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import BaseInput from '../BaseInput.vue';
import BaseSelectOption from '../BaseSelectOption.vue';
import BaseButton from '../BaseButton.vue';

export default {
  components: {
    'base-input': BaseInput,
    'select-option': BaseSelectOption,
    'base-button': BaseButton,
  },
  data() {
    return {
      user: {
        type: null,
        username: null,
        NID: null,
        password: null,
        email: null,
        description: null,
        fullName: null,
        location: {
          country: null,
          province: null,
          address: null,
        },
      },
      countries: null,
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
  },
};
</script>

<style lang="postcss" scoped>
.fields-container {
  @apply mt-7 border-none;
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
