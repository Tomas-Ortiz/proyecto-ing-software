<template>
    <form @submit.prevent="allInputsAreValid" class="form">
        <div class="user-type-container">
            <base-radio
                v-model="type"
                name="type"
                value="Particular"
                :checked="true"
            />
            <base-radio
                v-model="type"
                name="type"
                value="ONG"
            />
        </div>
        <base-input
            v-model="fullName"
            name="fullName"
            id="fullName"
            placeholder="Nombre completo"
            :regex="regex.fullName"
            errorMsg="El campo de Nombre no puede estar vacío y se debe introducir nombre y apellido y no más de 30 caracteres"
        />
        <base-input
            v-if="type == 'Particular'"
            v-model="id"
            name="NID"
            id="NID"
            placeholder="DNI"
            :regex="regex.id"
            errorMsg="El campo de DNI no puede estar vacío y se deben introducir entre 8 y 20 números"
        />
        <base-text-area
          v-else-if="type == 'ONG'"
          v-model="description"
          placeholder="Una breve descripción de tu organización..."
        />
        <base-input
            v-model="email"
            type="email"
            name="email"
            id="email"
            placeholder="Correo Electrónico"
            :regex="regex.email"
            errorMsg="La dirección de correo introducida no es válida"
        />
        <base-input
            v-model="username "
            name="username"
            id="username"
            placeholder="Nombre de Usuario"
            :regex="regex.username"
            errorMsg="El nombre de usuario debe contener entre 5 y 16 caracteres y puede contener números, letras y los caracteres: _ y ."
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
        <base-input
            v-model="location.country"
            name="country"
            id="country"
            placeholder="País de Residencia"
            errorMsg="El nombre del país no puede estar vacío y no puede contener números y debe tener entre 1 y 30 caracteres"
            :regex="regex.country"
        />
        <base-input
            v-model="location.province"
            name="province"
            id="province"
            placeholder="Provincia de Residencia"
            errorMsg="La provincia no puede estar vacía y no puede contener números y debe tener entre 1 y 30 caracteres"
            :regex="regex.country"
        />
        <base-input
            v-model="location.address"
            name="address"
            id="address"
            placeholder="Dirección"
            :regex="regex.address"
            errorMsg="La dirección puede tener los siguientes formatos: Rivadavia 504, Rivadavia, Calle Rivadavia 504 y debe contener entre 1 y 30 caracteres"
        />
        <contact-form v-model="contact"></contact-form>
        <div :class="['error-message-container', error.visibility, error.title]" role="alert">
          <strong class="font-bold">{{ error.title }}!</strong><br>
          <span class="error-message">{{ error.message }}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              @click="error.visibility = 'hidden'">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
        <base-button
          @click="allInputsAreValid"
          name="submit-button"
          id="submit-button"
          class="submit"
          type="submit"
          buttonText="ENVIAR"
          :isDisabled="false"
        />
    </form>
</template>

<script>
import axios from 'axios'

import ContactForm from './ContactForm.vue'
import BaseInput from './layout/BaseInput.vue'
import BaseTextArea from './layout/BaseTextArea.vue'
import BaseButton from './layout/BaseButton.vue'
import BaseRadio from './layout/BaseRadio.vue'
// import BaseErrorMessage from './layout/BaseErrorMessage.vue'

export default {
  components: {
    'contact-form': ContactForm,
    'base-input': BaseInput,
    'base-text-area': BaseTextArea,
    'base-button': BaseButton,
    'base-radio': BaseRadio,
    // 'base-error-message': BaseErrorMessage,
  },
  data() {
    return {
      error: {
        message: '',
        title: 'ERROR',
        visibility: 'hidden',
      },
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
        username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,15}$/,
        fullName: /^([a-zA-ZñáéíúúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){1,30}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/,
        email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        // eslint-disable-next-line no-useless-escape
        address: /^[A-Za-z0-9'\.\-\s\,]{1,30}$/,
        id: /^([0-9]{8,20})$/,
        country: /^([a-zA-ZñáéíúúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){1,30}$/,
      },
    }
  },
  methods: {
    allInputsAreValid() {
      if (this.fullName.isValid
        && this.username.isValid
        && this.email.isValid
        && this.password.isValid
        && this.location.country.isValid
        && this.location.province.isValid
        && this.location.address.isValid
        && this.contact.instagram.isValid
        && this.contact.facebook.isValid
        && this.contact.whatsapp.isValid
        && (this.id.isValid || (this.description && this.description.trim() !== ''))) {
        console.log('All inputs are valid')
        this.createUserData()
        this.emitUserData()
      } else {
        this.error.visibility = 'block'
        this.error.message = 'Algunos de los valores ingresados no son correctos, asegurate de que ninguno se encuentre vacío'
      }
    },
    createUserData() {
      this.userData = {
        type: this.type,
        fullname: this.fullName.value,
        location: { country: this.location.country.value, city: this.location.province.value, address: this.location.address.value },
        username: this.username.value,
        password: this.password.value,
        email: this.email.value,
        contact: [
          { contactType: 'whatsapp', value: this.contact.whatsapp.value },
          { contactType: 'facebook', value: this.contact.facebook.value },
          { contactType: 'instagram', value: this.contact.instagram.value },
        ],
      }
      if (this.type === 'Particular') {
        this.userData.NID = this.id.value
      } else if (this.type === 'ONG') {
        this.userData.description = this.description
      }
    },
    emitUserData() {
      let serverResponse = {}
      axios.post('http://localhost:3000/register', this.userData)
        .then((response) => {
          console.log('RESPONSE')
          console.log(response)
          this.error.title = 'ÉXITO'
          this.error.message = 'El usuario se ha registrado con éxito'
          this.error.visibility = 'block'
        })
        .catch((error) => {
          this.error.title = 'ERROR'
          this.error.message = 'El usuario o el correo ingresados ya se encuentran registrados'
          this.error.visibility = 'block'
          console.log('ERROR')
          console.log(error.msg)
        })
    },
  },
}
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
.ERROR {
  @apply bg-red-100 border-red-400 text-red-700;
}
.ÉXITO {
  @apply bg-green-100 border-green-400 text-green-700;
}
</style>
