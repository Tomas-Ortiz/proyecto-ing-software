<template>
  <div class="input-container">
    <input
      :type="type"
      :id="id"
      :class="[className + '-input', { valid: isValid }]"
      :name="name"
      :placeholder="placeholder"
      v-model="value"
      :min="min"
      @keyup="emitInputValue"
      @change="emitInputValue"
    />
    <base-error-message
      :errorMsg="errorMsg"
      :class="errorMessageVisibility"
      @click="errorMessageVisibility = 'hidden'"
    />
  </div>
</template>

<script>
import BaseErrorMessageVue from './BaseErrorMessage.vue'

export default {
  components: {
    'base-error-message': BaseErrorMessageVue,
  },
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
    min: {
      type: Number,
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
  @apply w-4/5 px-4 py-3 rounded relative;
}
.error-message {
  @apply inline sm:inline;
}
</style>
