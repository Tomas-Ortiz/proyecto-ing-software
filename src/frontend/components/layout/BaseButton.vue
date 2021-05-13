<template>
    <button type="submit"
      :class="{disabled: isDisabled}"
      :disabled="isDisabled">
      {{ isDisabled ? disabledText : buttonText }}
    </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: false,
      default: 'Enviar',
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabledText: {
      type: String,
      required: false,
      default: 'algunos campos son incorrectos',
    },
  },
}
</script>

<style lang="postcss" scoped>
button {
  @apply w-4/5 my-4 mx-auto p-2;
  @apply rounded bg-pink-900 text-gray-200;
  @apply tracking-widest font-bold;
}
.disabled {
  @apply bg-gray-400;
}
</style>
