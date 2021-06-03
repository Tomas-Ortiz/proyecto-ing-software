<template>
  <div class="full-container">
    <div :class="['input-container', size , { valid: isValid, invalid: !isValid }]">
      <input
        :type="type"
        :id="id"
        class="form-input"
        :name="name"
        :placeholder="placeholder"
        v-model="value"
        :min="min"
        @keyup="emitInputValue"
        @change="emitInputValue"
      />
      <base-svg-icon name="edit" class="edit-icon"></base-svg-icon>
    </div>
    <base-svg-icon name="correct" :class="['correct-icon', { show: isValid }]"></base-svg-icon>
    <base-error-message
      :errorMsg="errorMsg"
      :class="[errorMessageVisibility, size]"
      @click="errorMessageVisibility = 'hidden'"
    />
  </div>
</template>

<script>
import BaseErrorMessageVue from '../BaseErrorMessage.vue'
import BaseSVGIcon from '../BaseSVGIcon.vue'

export default {
  components: {
    'base-error-message': BaseErrorMessageVue,
    'base-svg-icon': BaseSVGIcon,
  },
  emits: ['update:modelValue'],
  props: {
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
    size: {
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
.full-container {
  @apply grid w-min items-center;
}
.input-container {
  @apply w-44 grid px-2 py-1 col-start-1;
  @apply bg-gray-300 ;
  @apply border-2 rounded-md border-gray-500;
}
.input-container.big {
  @apply w-60;
}
.input-container.small {
  @apply w-36;
}
.form-input {
  @apply w-auto col-start-1;
  @apply appearance-none bg-transparent focus:outline-none leading-tight;
}
.input-container.big > .form-input {
  @apply w-48;
}
.input-container.small > .form-input {
  @apply w-16;
}

.error-message-container {
  @apply bg-red-100 border border-red-400 text-red-700;
  @apply w-44 mx-auto px-4 py-3 rounded relative my-2 col-span-2;
}
.error-message-container.big {
  @apply w-60;
}
.error-message-container.small {
  @apply w-36 text-sm;
}

.edit-icon {
  @apply w-8 col-start-2 mx-auto pl-1;
  @apply border-l-2 border-gray-500;
}
.correct-icon {
  @apply w-8 col-start-2 hidden;
}
.correct-icon.show {
  @apply block;
}

.form-input::-webkit-outer-spin-button,
.form-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.form-input[type=number] {
  -moz-appearance: textfield;
}
</style>
