<template>
  <div class="banner-container">
    <div class="banner-link login">Login</div>
    <div class="banner-link signup">Join</div>
    <img
      src="../../assets/images/banner-image.jpg"
      class="banner-image"
      alt="Banner Image of Three Dogs"
    >
    <div class="banner-title">Puppers</div>
  </div>
</template>

<style lang="postcss" scoped>
.banner-container {
  @apply relative w-full h-screen overflow-x-hidden grid grid-rows-6 grid-cols-12;
}
.banner-image {
  @apply z-0;
  @apply absolute w-full h-full object-cover object-center filter blur-sm;
}
.banner-link,
.banner-title {
  @apply z-10;
  @apply font-extrabold text-center cursor-default select-none col-span-2;
}
.banner-link {
  @apply text-gray-200;
  @apply text-2xl md:text-3xl md:p-5 lg:p-10;
}
.login {
  @apply col-end-3;
}
.signup {
  @apply col-end-13;
}
.banner-title {
  @apply row-start-3 col-start-3 col-span-8 md:col-start-5 md:col-span-4;
  @apply text-6xl md:text-7xl lg:text-8xl xl:text-9xl;
  @apply text-gray-900;
}
</style>
