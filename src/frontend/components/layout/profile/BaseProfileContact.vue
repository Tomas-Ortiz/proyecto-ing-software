<template>
  <div class="contact-container">
    <div class="container-title">
      <h1>Opciones de Contacto</h1>
    </div>

    <div class="contact"
      v-for="contactMethod in contactInfo"
      :key="contactMethod.contactType">
      <contact-icon
        class="contact-icon"
        :name="contactMethod.contactType">
      </contact-icon>
      <base-input
        id="contactMethod.contactType"
        class="contact-input"
        name="contactMethod.contactType"
        :placeholder="contactMethod.value"
        :regex="getRegexFor(contactMethod.contactType)"
        errorMsg="Llenar el campo con un valor correcto"
        @keyup="emitInputValue"
        v-model="contact[contactMethod.contactType].value"
        >
      </base-input>
    </div>

  </div>
</template>

<script>
import BaseContactIcon from '../BaseSVGIcon.vue';
import BaseInput from '../BaseInput.vue';

export default {
  props: {
    contactInfo: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  components: {
    'contact-icon': BaseContactIcon,
    'base-input': BaseInput,
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
      },
      updatedContacts: [],
      oldContacts: [],
    }
  },
  mounted() {
    this.updatedContacts = this.contactInfo;
    this.oldContacts = this.contactInfo;
    console.log('OLD CONTACTS:');
    console.log(this.oldContacts);
  },
  methods: {
    getRegexFor(name) {
      return this.contact[name].regex;
    },
    emitInputValue() {
      // Si existe un nuevo valor ingresado, agregarlo a updatedContacts
      // Si el valor ingresado no es válido, agregar el valor viejo a updatedContacts
      this.updatedContacts = this.contactInfo;
      console.log('UPDATED CONTACTS:');
      console.log(this.updatedContacts);
      this.updatedContacts.forEach((item) => {
        if (this.contact[item.contactType].value && this.contact[item.contactType].value.isValid) {
          const index = this.updatedContacts.indexOf(item);
          const newContact =
          {
            contactType: item.contactType,
            value: this.contact[item.contactType].value.value,
          }
          this.updatedContacts.splice(index, 1, newContact);
        } else {
          const index = this.updatedContacts.indexOf(item);
          const oldContact = this.oldContacts.filter((value) => {
            return item.contactType === value.contactType;
          });
          this.updatedContacts.splice(index, 1, oldContact);
        }
      });
      this.$emit('update:modelValue', this.updatedContacts);
    },
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
  @apply mt-5 mx-auto w-56 lg:w-80 xl:w-96;
}
.contact-icon {
  @apply w-10 mr-2 inline-block align-top mt-2;
}
.contact-input {
  @apply w-3/4 lg:w-8/12 inline-block;
}
</style>
