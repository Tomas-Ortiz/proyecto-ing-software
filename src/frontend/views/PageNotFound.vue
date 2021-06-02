<template>
  <div class="page-not-found">
    <div>
      <h1 class="error-title">404 - Página no encontrada :(</h1>
      <img
        src="../assets/illustrations/pet-adoption.svg"
        alt="Ilustración de una persona observando una página de adopción de mascotas."
        class="error-image"
      >
      <p class="error-text">Esta página ya no existe o se movió a otra ubicación</p>
      <router-link class="link-home" to="/">Volver a la página principal</router-link>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page-not-found {
  @apply flex h-screen justify-center items-center;
  @apply text-center text-red-500;
}
.error-title {
  @apply font-bold;
}
.error-text,
.error-title {
  @apply my-5;
}
.error-image {
  @apply max-w-xl;
}
.link-home {
  @apply text-gray-200 bg-pink-900 px-3 py-2 rounded-md;
}
</style>
