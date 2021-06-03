<template>
  <div class="card-container">
    <div class="container">
      <div class="title-container">
        <slot name="title"></slot>
      </div>
      <div class="form-container">
        <slot name="form"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.card-container {
  @apply bg-gray-100 text-center py-10;
}
.container {
  @apply mx-auto px-5 md:px-20 lg:px-60 xl:px-96 2xl:px-96;
}
.form-container,
.title-container {
  @apply border-l-2 border-r-2 border-pink-900;
}
.form-container {
  @apply px-5;
}
</style>
