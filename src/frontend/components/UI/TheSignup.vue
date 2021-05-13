<template>
  <signup-card>
    <template #image>
      <h2></h2>
      <p></p>
      <img src="../../assets/images/signup-card-image.jpg" alt="a cat wearing a crown">
    </template>
    <template #title>
      <h1 class="title">{{ signupFormData.title }}</h1>
    </template>
    <template #form>
      <signup-form></signup-form>
    </template>
    <template #forgot>
    </template>
  </signup-card>
</template>

<script>
import SignupCard from '../SignupCard.vue'
import SignupForm from '../SignupForm.vue';

export default {
  components: {
    'signup-card': SignupCard,
    'signup-form': SignupForm,
  },
  data() {
    return {
      signupFormData: {
        title: 'Unite a la comunidad',
        image: {
          url: '../../assets/images/signup-card-image.jpg',
          alt: 'un gato usando una corona',
        },
      },
      signinFormData: {
        title: 'Bienvenido de vuela',
        footer: 'Te olvidaste la contraseña?',
        image: {
          url: '../../assets/images/signup-card-image.jpg',
          alt: 'un gato usando una corona',
        },
      },
    }
  },
}
</script>
