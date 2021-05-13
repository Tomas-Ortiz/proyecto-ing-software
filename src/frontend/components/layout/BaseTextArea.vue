<template>
    <textarea
      v-model="value"
      :placeholder="placeholder"
      @keyup="emitInputValue"
    ></textarea>
</template>

<script>
export default {
  props: {
    modelValue: {},
    placeholder: {
      type: String,
      required: false,
      default: 'Enter your text here!',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      value: this.modelValue,
    }
  },
  methods: {
    emitInputValue() {
      this.$emit('update:modelValue', this.value)
    },
  },
}
</script>

<style lang="postcss" scoped>
textarea {
  @apply my-4 w-4/5 mx-auto resize-none rounded h-40;
  @apply bg-gray-300 focus:outline-none leading-tight text-xs p-4;
}
</style>
