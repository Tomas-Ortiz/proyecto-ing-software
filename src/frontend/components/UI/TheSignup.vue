<template>
  <base-signup-card>
    <template #image>
      <h2></h2>
      <p></p>
      <img
        src="../../assets/images/signup-card-image.jpg"
        alt="a cat wearing a crown"
      />
    </template>
    <template #title>
      <h1 class="title">{{ signupFormData.title }}</h1>
    </template>
    <template #form>
      <signup-form></signup-form>
    </template>
    <template #forgot> </template>
  </base-signup-card>
</template>

<script>
import BaseSignupCard from '../layout/BaseSignupCard.vue';
import SignupForm from '../SignupForm.vue';

export default {
  components: {
    'base-signup-card': BaseSignupCard,
    'signup-form': SignupForm,
  },
  data() {
    return {
      signupFormData: {
        title: '¡Únete a la comunidad!',
        image: {
          url: '../../assets/images/signup-card-image.jpg',
          alt: 'un gato usando una corona',
        },
      },
      signinFormData: {
        title: 'Bienvenido de vuelta',
        footer: '¿Te olvidaste la contraseña?',
        image: {
          url: '../../assets/images/signup-card-image.jpg',
          alt: 'un gato usando una corona',
        },
      },
    };
  },
};
</script>

<style lang="postcss" scoped>
img {
  @apply w-full h-full object-cover object-center filter blur-sm ;
}
.image-container > h2,
.image-container > p {
  @apply absolute text-gray-300 z-10;
}
.image-container > h2 {
  @apply mx-32 text-3xl mt-16
}
.image-container > p {
  @apply mx-24 text-2xl mt-24
}

.title {
  @apply text-3xl font-semibold text-gray-900 my-10 md:mt-14;
}

.forgot-container {
  @apply mb-8 border-t border-pink-900 w-5/6 mx-auto;
}
.forgot {
  @apply text-gray-600 text-sm mt-4;
}
</style>
