<template>
  <div class="contact-options">
    <label class="contact-title" for="contact-option"
      >Opciones de Contacto</label
    >
    <div class="contact-option">
      <base-contact-icon name="instagram"></base-contact-icon>
      <base-input
        v-model="contact.instagram"
        type="url"
        name="instagram"
        id="instagram"
        :placeholder="`https://instagram.com/username`"
        @keyup="emitContact"
        :regex="instagramEx"
        errorMsg="El formato de contacto debe ser el siguiente: instagram.com/usuario"
      />
    </div>
    <div class="contact-option">
      <base-contact-icon name="facebook"></base-contact-icon>
      <base-input
        v-model="contact.facebook"
        type="url"
        name="facebook"
        id="facebook"
        :placeholder="`https://facebook.com/username`"
        @keyup="emitContact"
        :regex="facebookEx"
        errorMsg="El formato de contacto debe ser el siguiente: facebook.com/usuario"
      />
    </div>
    <div class="contact-option">
      <base-contact-icon name="whatsapp"></base-contact-icon>
      <base-input
        v-model="contact.whatsapp"
        type="tel"
        name="whatsapp"
        id="whatsapp"
        placeholder="2634-4444-22"
        @keyup="emitContact"
        :regex="whatsappEx"
        errorMsg="El número de contacto introducido no es válido"
      />
    </div>
  </div>
</template>

<script>
import BaseInput from './layout/BaseInput.vue';
import BaseContactIcon from './layout/BaseSVGIcon.vue';

export default {
  components: {
    'base-input': BaseInput,
    'base-contact-icon': BaseContactIcon,
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      contact: this.modelValue,
      instagramEx: /(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\/?/,
      facebookEx: /((http|https):\/\/|)(www\.|)facebook\.com\/[a-zA-Z0-9.]{1,}/,
      whatsappEx: /([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/,
    };
  },
  methods: {
    inputsAreValid() {
      return (
        this.instagramEx.test(this.contact.instagram) &&
        this.facebookEx.test(this.contact.facebook) &&
        this.whatsappEx.test(this.contact.whatsapp)
      );
    },
    emitContact() {
      // console.log(`The contact inputs are valid: ${this.inputsAreValid()}`);
      if (this.inputsAreValid()) {
        this.$emit('update:modelValue', this.contact);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.contact-title {
  @apply text-xl text-gray-800 font-semibold;
}
.input-container {
  @apply inline w-3/5;
}
.contact-option > .input-container > input {
  @apply w-3/5 inline-block;
}
.contact-option {
  @apply mt-4;
}
.contact-option > svg {
  @apply w-9 inline-block;
}
</style>
