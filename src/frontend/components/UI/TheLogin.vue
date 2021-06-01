<template>
 <base-signup-card>
    <template #form>
      <login-form></login-form>
    </template>
 </base-signup-card>
</template>

<script>
import BaseSignupCard from '../layout/BaseSignupCard.vue';
import LoginFrom from '../LoginForm.vue';

export default {
  components: {
    'base-signup-card': BaseSignupCard,
    'login-form': LoginFrom,
  },

}
</script>
