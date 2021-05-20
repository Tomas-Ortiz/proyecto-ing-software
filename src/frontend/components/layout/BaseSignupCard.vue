<template>
  <div class="card-container">
    <div class="image-container">
      <slot name="image"></slot>
    </div>
    <div class="container">
      <div class="title-container">
        <slot name="title"></slot>
      </div>
      <div class="form-container">
        <slot name="form"></slot>
      </div>
      <slot name="forgot"></slot>
      <!-- <div class="forgot-container">
          <slot name="forgot"></slot>
        </div> -->
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.card-container {
  @apply bg-gray-200 mx-auto mt-12 mb-10 lg:mt-28 rounded-md overflow-hidden;
  @apply md:grid md:grid-cols-2 max-w-sm md:max-w-3xl lg:max-w-4xl;
}

.image-container {
  @apply overflow-hidden hidden md:block;
}

.container {
  @apply md:col-start-2 grid grid-rows-1 items-center text-center;
}

.form-container {
  @apply row-span-4;
}
</style>
