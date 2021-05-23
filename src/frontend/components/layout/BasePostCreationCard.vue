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
  @apply bg-gray-200 mx-auto mt-12 mb-10 lg:mt-28 rounded-md overflow-hidden;
  @apply md:grid md:grid-cols-2 max-w-sm md:max-w-3xl lg:max-w-4xl;
  @apply md:col-start-2 grid grid-rows-1 items-center text-center;
}
.title {
  @apply text-3xl font-semibold text-gray-900 my-10 md:mt-14;
}
.form-container {
  @apply row-span-4;
}
</style>
