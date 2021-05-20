<template>
  <div :class="['error-message-container', messageVisibility]" role="alert">
    <strong class="font-bold">{{ errorTitle }}</strong
    ><br />
    <span class="error-message">{{ errorMsg }}</span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg
        class="fill-current h-6 w-6 text-red-500"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        @click="
          messageVisibility =
            messageVisibility === 'hidden' ? 'hidden' : 'block'
        "
      >
        <title>Close</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    visibility: {
      type: String,
      required: false,
      default: 'hidden',
    },
    errorMsg: {
      type: String,
      required: true,
    },
    errorTitle: {
      type: String,
      required: false,
      default: 'Error',
    },
    data() {
      return {
        messageVisibility: 'hidden',
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.error-message-container {
  @apply bg-red-100 border border-red-400 text-red-700;
  @apply w-4/5 mx-auto px-4 py-3 rounded relative;
}
.error-message {
  @apply block sm:inline;
}
</style>
