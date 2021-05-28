<template>
  <div class="filter-container">
    <div class="container-title">
      <h1>FILTROS</h1>
      <div class="search-bar-container">
        <input type="text" class="search-bar" name="search-bar" id="search-bar" placeholder="Buscar...">
        <svg class="search-bar-icon" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
          viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
          width="512px" height="512px">
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </div>
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
.search-bar-container {
  @apply p-2 my-5 bg-pink-200 text-gray-900 grid border-l-4 border-r-4 border-pink-900;
}
.search-bar {
  @apply bg-transparent h-10 text-sm font-semibold focus:outline-none col-start-1;
}
.search-bar-icon {
  @apply h-4 w-4 fill-current col-start-2 m-auto;
}
</style>
