<template>
  <div :class="['error-message-container', errorTitle]" role="alert">
    <strong class="error-title">{{ errorTitle }}</strong
    ><br />
    <span class="error-message">{{ errorMsg }}</span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
      <base-svg-icon class="close-icon" name="close"></base-svg-icon>
    </span>
  </div>
</template>

<script>
import BaseSVGIcon from './BaseSVGIcon.vue';

export default {
  components: {
    'base-svg-icon': BaseSVGIcon,
  },
  props: {
    visibility: {
      type: String,
      required: false,
      default: 'hidden',
    },
    errorMsg: {
      type: String,
      required: true,
      default: 'Error',
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
  @apply w-4/5 mx-auto px-4 py-3 rounded relative cursor-pointer;
}
.error-title,
.error-message {
  @apply select-none;
}
.error-title {
  @apply font-bold;
}
.error-message {
  @apply block sm:inline;
}
.close-icon {
  @apply w-8 select-none;
}
.Error {
  @apply bg-red-100 border-red-400 text-red-700;
}
.Éxito {
  @apply bg-green-100 border-green-400 text-green-700;
}
</style>
