<template>
  <div class="dropdown-container">
    <select
      :id="id"
      :name="name"
      v-model="value"
      :class="[className + '-select', { valid: isValid }]"
      @change="emitSelectedOption"
    >
      <option value="" selected disabled hidden>{{ defaultValue }}</option>
      <option v-for="option in options" :key="option" :value="option">{{
        option
      }}</option>
    </select>
    <base-error-message
      errorMsg="errorMsg"
      @click="errorMessageVisibility = 'hidden'"
      :class="errorMessageVisibility"
    ></base-error-message>
  </div>
</template>

<script>
import BaseErrorMessage from './BaseErrorMessage.vue'

export default {
  components: {
    'base-error-message': BaseErrorMessage,
  },
  emits: ['update:modelValue'],
  props: {
    className: {
      type: String,
      required: false,
      default: 'form',
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    options: Array,
    defaultValue: {
      type: [String, Number],
      required: false,
      default: 'Default value',
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
    emitSelectedOption() {
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
      return this.value !== '' && this.value !== this.defaultValue;
    },
  },
};
</script>

<style lang="postcss" scoped>
.form-select {
  @apply my-4 w-4/5 mx-auto;
  @apply bg-transparent focus:outline-none leading-tight;
  @apply border-b-2 border-pink-800;
}
.form-select.valid {
  @apply border-green-800;
}
.form-select.invalid {
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
