<template>
  <div class="header-container">
    <div class="header-title">
      <router-link class="title router" to="/">PUPPERS</router-link>
    </div>
    <div class="header-slot">
      <slot>
        <router-link class="slot router" to="/create-post">Crear Publicación</router-link>
        <router-link class="slot router" to="/">Cerrar Sesión</router-link>
      </slot>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.header-container {
  @apply bg-pink-900 h-20 grid grid-cols-12 items-center;
}
.header-title {
  @apply col-span-5 md:col-span-3;
}
.header-slot {
  @apply col-start-7 col-span-6 md:col-start-10 md:col-span-3 grid grid-cols-1;
}
.header-title,
.header-slot {
  @apply w-full text-center;
}
.router {
  @apply text-3xl font-bold text-gray-200;
  @apply align-middle h-full;
}
.slot.router {
  @apply text-lg md:text-2xl font-semibold;
}
</style>
