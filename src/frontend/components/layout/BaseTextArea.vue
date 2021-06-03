<template>
  <div>
    <textarea
      v-model="value"
      :class="[{ valid: isValid, invalid: !isValid }, changeStyle]"
      :placeholder="placeholder"
      @keyup="emitInputValue"
    ></textarea>
    <base-error-message
      :errorMsg="errorMsg"
      :class="errorMessageVisibility"
      @click="errorMessageVisibility = 'hidden'"
    ></base-error-message>
  </div>
</template>

<script>
import BaseErrorMessage from './BaseErrorMessage.vue';

export default {
  components: {
    'base-error-message': BaseErrorMessage,
  },
  props: {
    modelValue: {},
    placeholder: {
      type: String,
      required: false,
      default: '¡Ingresa tu texto aquí!',
    },
    regex: {
      type: RegExp,
      required: false,
      default: /^[a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9][a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9¡!¿?#'|°"$%&/()=+.,{}*¨¨´´@:;[\]_-\s]{0,99}$/,
    },
    errorMsg: {
      type: String,
      required: false,
      default:
        'La descripción solo puede contener entre 1 y 100 caracteres, puede contener letras, números, y caracteres especiales',
    },
    changeStyle: {
      type: String,
      required: false,
      default: '',
      validator: (value) => [
        'post-creation-style',
      ].indexOf(value) !== -1,
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      value: '',
      errorMessageVisibility: 'hidden',
    };
  },
  methods: {
    emitInputValue() {
      if (!this.isValid) {
        this.errorMessageVisibility = 'block';
      } else {
        this.errorMessageVisibility = 'hidden';
      }
      this.$emit('update:modelValue', {
        value: this.value,
        isValid: this.isValid,
      });
    },
  },
  computed: {
    isValid() {
      return this.regex.test(this.value);
    },
  },
};
</script>

<style lang="postcss" scoped>
textarea {
  @apply my-4 w-4/5 mx-auto resize-none rounded h-40;
  @apply bg-gray-300 focus:outline-none leading-tight text-sm p-4;
}
textarea::placeholder {
  @apply text-gray-800 italic;
}
.valid {
  @apply bg-green-300 text-gray-900;
}
.invalid {
  @apply bg-red-400 text-gray-900;
}
.error-message-container {
  @apply bg-red-100 border border-red-400 text-red-700;
  @apply w-4/5 mx-auto px-4 py-3 rounded relative;
}
.error-message {
  @apply block sm:inline placeholder-current;
}
.post-creation-style {
  @apply bg-gray-300 rounded;
}
</style>
