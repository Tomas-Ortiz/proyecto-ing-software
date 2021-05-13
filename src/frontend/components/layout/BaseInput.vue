<template>
    <div class="input-container">
      <input
        :type="type"
        :id="id"
        :class="[className + '-input', { valid: isValid }]"
        :name="name"
        :placeholder="placeholder"
        v-model="value"
        @keyup="emitInputValue"
      >
      <!-- <base-error-message
        :errorMsg="errorMsg"
      /> -->
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
// import BaseErrorMessageVue from './BaseErrorMessage.vue'

export default {
  // components: {
  //   'base-error-message': BaseErrorMessageVue,
  // },
  emits: ['update:modelValue'],
  props: {
    className: {
      type: String,
      required: false,
      default: 'form',
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    regex: {
      type: RegExp,
      required: false,
      // default: /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/g,
      default: /^([A-Za-z]+)$/,
    },
    errorMsg: {
      type: String,
      required: false,
      default: '',
    },
    modelValue: {},
  },
  data() {
    return {
      value: '',
      errorMessageVisibility: 'hidden',
    }
  },
  methods: {
    emitInputValue() {
      if (!this.isValid) {
        this.errorMessageVisibility = 'block'
      } else {
        this.errorMessageVisibility = 'hidden'
      }
      this.$emit('update:modelValue', { value: this.value, isValid: this.isValid })
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
.form-input {
  @apply my-4 w-4/5 mx-auto;
  @apply appearance-none bg-transparent focus:outline-none leading-tight;
  @apply border-b-2 border-pink-800;
}
.form-input.valid {
  @apply border-green-800;
}
.form-input.invalid {
  @apply border-red-800;
}
.error-message-container {
  @apply bg-red-100 border border-red-400 text-red-700;
  @apply w-4/5 mx-auto px-4 py-3 rounded relative;
}
.error-message {
  @apply block sm:inline;
}
</style>
