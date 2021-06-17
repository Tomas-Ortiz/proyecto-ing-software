<template>
  <div class="contact-container">
    <div class="container-title">
      <h1>Opciones de Contacto</h1>
    </div>

    <div
      class="contact"
      v-for="contactMethod in contactInfo"
      :key="contactMethod.contactType"
    >
      <contact-icon class="contact-icon" :name="contactMethod.contactType">
      </contact-icon>
      <base-input
        v-model="contact[contactMethod.contactType].value"
        id="contactMethod.contactType"
        class="contact-input"
        name="contactMethod.contactType"
        :placeholder="contactMethod.value"
        :regex="getRegexFor(contactMethod.contactType)"
        errorMsg="El contacto ingresado no es válido"
        @keyup="emitInputValue"
      >
      </base-input>
    </div>
  </div>
</template>

<script>
import BaseContactIcon from '../BaseSVGIcon.vue';
import BaseInput from '../BaseInput.vue';

export default {
  components: {
    'contact-icon': BaseContactIcon,
    'base-input': BaseInput,
  },
  props: {
    contactInfo: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  mounted() {
    this.updatedContacts = this.contactInfo;
  },
  data() {
    return {
      contact: {
        instagram: {
          value: '',
          regex: /(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\/?/,
          type: 'instagram',
        },
        facebook: {
          value: '',
          regex: /((http|https):\/\/|)(www\.|)facebook\.com\/[a-zA-Z0-9.]{1,}/,
          type: 'facebook',
        },
        whatsapp: {
          value: '',
          regex: /([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/,
          type: 'whatsapp',
        },
      },
      updatedContacts: [],
    };
  },
  methods: {
    getRegexFor(name) {
      return this.contact[name].regex;
    },
    emitInputValue() {
      // Si existe un nuevo contacto ingresado, y es válido, reemplazarlo por el antiguo
      this.updatedContacts = this.contactInfo;
      let contactIndex;
      Object.values(this.contact).forEach((contact) => {
        if (contact.value.value !== undefined && contact.value.isValid) {
          contactIndex = this.updatedContacts.findIndex((item) => {
            return item.contactType === contact.type;
          });
          const newContact = {
            contactType: contact.type,
            value: contact.value.value,
          };
          this.updatedContacts.splice(contactIndex, 1, newContact);
        }
      });
      this.$emit('update:modelValue', this.updatedContacts);
    },
  },
};
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
  @apply mt-5 mx-auto w-56 lg:w-80 xl:w-96;
}
.contact-icon {
  @apply w-10 mr-2 inline-block align-top mt-2;
}
.contact-input {
  @apply w-3/4 lg:w-8/12 inline-block;
}
</style>
