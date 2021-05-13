<template>
  <div>
    <textarea
        v-model="value"
        :class="{valid: isValid, invalid: !isValid}"
        :placeholder="placeholder"
        @keyup="emitInputValue"
      ></textarea>
    <div :class="['error-message-container', errorMessageVisibility]" role="alert">
      <strong class="font-bold">ERROR!</strong><br>
      <span class="error-message">{{ errorMsg }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="errorMessageVisibility = 'hidden'">
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {},
    placeholder: {
      type: String,
      required: false,
      default: 'Ingresa tu texto aquí!',
    },
    regex: {
      type: RegExp,
      required: false,
      default: /^[a-zA-Z0-9][a-zA-Z0-9¡!¿?#'|°"$%&/()=+.,{}*¨¨´´@:;[\]_-\s]{1,100}$/,
    },
    errorMsg: {
      type: String,
      required: false,
      default: 'La descripción solo puede contener entre 1 y 100 caracteres y puede contener Letras, números, y caracteres especiales',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      value: this.modelValue,
      errorMessageVisibility: 'hidden',
    }
  },
  methods: {
    emitInputValue() {
      if (!this.isValid) {
        this.errorMessageVisibility = 'block'
        this.$emit('update:modelValue', this.value)
      } else {
        this.errorMessageVisibility = 'hidden'
      }
    },
  },
  computed: {
    isValid() {
      return this.regex.test(this.value)
    },
  },
}
</script>

<style lang="postcss" scoped>
textarea {
  @apply my-4 w-4/5 mx-auto resize-none rounded h-40;
  @apply bg-gray-300 focus:outline-none leading-tight text-xs p-4;
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
</style>
