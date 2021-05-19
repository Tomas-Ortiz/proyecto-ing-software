<template>
  <div>
    <contact-form v-model="contact"></contact-form>
  </div>
</template>

<script>
import BaseContactForm from '../../ContactForm.vue';

export default {
  components: {
    'contact-form': BaseContactForm,
  },
  data() {
    return {
      contact: {
        instagram: null,
        facebook: null,
        whatsapp: null,
      }
    }
  },
}
</script>
