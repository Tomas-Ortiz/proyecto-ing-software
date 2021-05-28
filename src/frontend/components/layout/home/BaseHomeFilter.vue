<template>
  <div class="filter-container">
    <div class="container-title">
      <h1>FILTROS</h1>
      <div class="filters">
        <div class="filter">
          <h2 class="filter-title">Especie</h2>
          <p class="filter-type" v-for="item in species" :key="item">{{ item }}</p>
        </div>
        <div class="filter">
          <h2 class="filter-title">Color</h2>
          <p class="filter-type" v-for="item in species" :key="item">{{ item }}</p>
        </div>
        <div class="filter">
          <h2 class="filter-title">Género</h2>
          <p class="filter-type" v-for="item in species" :key="item">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      species: ['perro', 'gato', 'ave', 'reptil', 'conejo', '...'],
      colors: ['rojo', 'verde', 'amarillo', 'negro', 'blanco', 'marrón', 'azul', '...'],
      genders: ['macho', 'hembra', 'desconocido', '...'],
    }
  },
}
</script>

<style lang="postcss" scoped>
.filter-container {
  @apply min-h-full w-full bg-pink-900;
}
.container-title {
  @apply text-xl md:text-2xl text-gray-200 font-bold text-center tracking-wider;
}
.filter {
  @apply text-sm font-normal text-left my-5 mx-3 md:mx-10 lg:mx-16 xl:mx-20;
}
.filter-title {
  @apply text-lg font-semibold;
}
.filter-type {
  @apply cursor-pointer w-min my-1;
}
</style>
