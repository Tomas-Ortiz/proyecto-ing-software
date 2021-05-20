<template>
  <div>
    <input
      type="radio"
      :name="name"
      :id="id"
      :value="value"
      @click="emitInputValue"
      :checked="checked"
    />
    <label :for="id">{{ value }}</label>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  modelValue: {},
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      id: this.value.toLocaleLowerCase(),
    };
  },
  methods: {
    emitInputValue() {
      this.$emit('update:modelValue', this.value);
    },
  },
};
</script>

<style lang="postcss" scoped>
div {
  @apply inline-block mx-5;
}
input {
  @apply bg-red-400 w-10 cursor-pointer;
}
label {
  @apply cursor-pointer;
}
</style>
