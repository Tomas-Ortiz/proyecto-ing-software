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
<<<<<<< HEAD

=======
img {
  @apply w-full h-full object-cover object-center filter blur-sm;
}
.image-container > h2,
.image-container > p {
  @apply absolute text-gray-300 z-10;
}
.image-container > h2 {
  @apply mx-32 text-3xl mt-16;
}
.image-container > p {
  @apply mx-24 text-2xl mt-24;
}
>>>>>>> feature/createPost-frontend
.container {
  @apply md:col-start-2 grid grid-rows-1 items-center text-center;
}

.form-container {
  @apply row-span-4;
}
</style>
