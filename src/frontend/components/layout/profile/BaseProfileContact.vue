<template>
  <div class="contact-container">

    <div class="container-title">
      <h1>Opciones de Contacto</h1>
    </div>

    <div class="contact">
      <contact-icon
        class="contact-icon"
        name="instagram">
      </contact-icon>
      <base-input
        id=""
        class="contact-input"
        name=""
        placeholder="instagram.com/"
        :regex="contact.instagram.regex">
      </base-input>
    </div>

    <div class="contact">
      <contact-icon
        class="contact-icon"
        name="facebook">
      </contact-icon>
      <base-input
        id=""
        class="contact-input"
        name=""
        placeholder="facebook.com/"
        :regex="contact.facebook.regex">
      </base-input>
    </div>

    <div class="contact">
      <contact-icon
        class="contact-icon"
        name="whatsapp">
      </contact-icon>
      <base-input
        id=""
        class="contact-input"
        name=""
        placeholder="3219038192"
        :regex="contact.whatsapp.regex">
      </base-input>
    </div>

    <div class="update-button">
      <base-button
        buttonText="UPDATE">
      </base-button>
    </div>

  </div>
</template>

<script>
import BaseButton from '../BaseButton.vue';
import BaseContactIcon from '../BaseSVGIcon.vue';
import BaseInput from '../BaseInput.vue';

export default {
  components: {
    'contact-icon': BaseContactIcon,
    'base-input': BaseInput,
    'base-button': BaseButton,
  },
  data() {
    return {
      contact: {
        instagram: {
          value: null,
          regex: /(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\/?/,
        },
        facebook: {
          value: null,
          regex: /((http|https):\/\/|)(www\.|)facebook\.com\/[a-zA-Z0-9.]{1,}/,
        },
        whatsapp: {
          value: null,
          regex: /([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/,
        },
      }
    }
  },
}
</script>

<style lang="postcss" scoped>
.contact-container {
  @apply w-full mt-7 mx-auto lg:mr-10;
}
.container-title {
  @apply text-xl font-bold text-pink-900;
  @apply border-b-2 border-pink-900 w-max mx-auto;
}
.contact {
  @apply mt-5 mx-auto w-60;
}
.contact-icon {
  @apply w-10 mr-2 inline-block align-top mt-2;
}
.contact-input {
  @apply w-3/4 inline-block;
}
.update-button {
  @apply w-60 mx-auto text-center mt-4;
}
</style>
