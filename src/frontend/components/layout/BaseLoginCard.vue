<template>
  <div class="card-container">
    <div class="image-container">
      <slot name="leftTitle"></slot>
      <slot name="image"></slot>
    </div>
    <div class="container">
      <div class="title-container">
        <slot name="title"></slot>
      </div>
      <div class="form-container">
        <slot name="form"></slot>
      </div>
      <slot name="withoutAccount"></slot>
      <slot name="register"></slot>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.card-container {
  @apply bg-gray-200 mx-auto mb-10 lg:mt-3 rounded-md overflow-hidden;
  @apply md:grid md:grid-cols-2 max-w-sm md:max-w-3xl lg:max-w-4xl;
  @apply mt-10 max-h-full;
}
.image-container {
  @apply overflow-hidden hidden md:block;
}
.image-container {
  transform: scale(1.1);
}
.container {
  @apply md:col-start-2 items-center text-center h-3/5;
}
.form-container {
  @apply row-span-4;
}
</style>
