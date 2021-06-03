<template>
 <base-login-card>
   <template #image>
      <img
        src="../../assets/images/login-card-image.jpg"
        alt="a dog  wearing a crown"
      />
    </template>
    <template #title>
      <h1 class="title">{{ loginFormData.title }}</h1>
    </template>
    <template #form>
      <login-form></login-form>
    </template>
    <template #withoutAccount>
      <h2 class="withoutAccount">{{ loginFormData.withoutAccount }}</h2>
    </template>
    <template #register>
      <a class="register" href="/signup">{{ loginFormData.redirect }}</a>
    </template>

 </base-login-card>
</template>

<script>
import BaseLoginCard from '../layout/BaseLoginCard.vue';
import LoginFrom from '../LoginForm.vue';

export default {
  components: {
    'base-login-card': BaseLoginCard,
    'login-form': LoginFrom,
  },
  data() {
    return {
      loginFormData: {
        title: 'Bienvenido/a de vuelta',
        withoutAccount: '¿Aun no tienes una cuenta?',
        redirect: 'Registrarse',
        image: {
          url: '../../assets/images/login-card-image.jpg',
          alt: 'Un perro usando una corona',
        },
      }
    };
  },
}
</script>

<style lang="postcss" scoped>
img {
  @apply w-full h-full object-cover object-center filter blur-sm;
}
.title {
  @apply text-3xl font-semibold text-gray-900 my-8 pt-8 md:mt-1;
}
.withoutAccount {
  @apply text-2xl font-semibold text-gray-900 pt-16 md:mt-1;
}
.register {
  @apply font-semibold text-pink-600 underline;
}

</style>
