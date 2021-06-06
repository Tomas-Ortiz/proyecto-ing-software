<template>
  <div class="filter-container">
    <div class="container-title">
      <h1>Filtros</h1>
      <div class="search-bar-container">
        <input
          type="text"
          class="search-bar"
          v-model="searchbarQuery"
          @keyup="emitInputValue"
          name="search-bar"
          id="search-bar"
          placeholder="Buscar..."
        />
        <base-svg-icon name="search" class="search-bar-icon"></base-svg-icon>
      </div>
      <div class="filters">
        <div class="filter">
          <h2 class="filter-title">Especie</h2>
          <p
            :class="['filter-type', { selected: filters.includes(item) }]"
            v-for="item in species"
            :key="item"
            @click="selectFilter(item)"
          >
            {{ item }}
          </p>
        </div>
        <div class="filter">
          <h2 class="filter-title">Color</h2>
          <p
            :class="['filter-type', { selected: filters.includes(item) }]"
            v-for="item in colors"
            :key="item"
            @click="selectFilter(item)"
          >
            {{ item }}
          </p>
        </div>
        <div class="filter">
          <h2 class="filter-title">Género</h2>
          <p
            :class="['filter-type', { selected: filters.includes(item) }]"
            v-for="item in genders"
            :key="item"
            @click="selectFilter(item)"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSVGIcon from '../BaseSVGIcon.vue';

export default {
  components: {
    'base-svg-icon': BaseSVGIcon,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      species: ['perro', 'gato', 'ave', 'reptil', 'conejo'],
      colors: [
        'rojo',
        'verde',
        'amarillo',
        'negro',
        'blanco',
        'marrón',
        'azul',
      ],
      genders: ['macho', 'hembra'],
      filters: [],
      searchbarQuery: '',
    };
  },
  methods: {
    emitInputValue() {
      this.$emit('update:modelValue', {
        query: this.searchbarQuery,
        filters: this.filters,
      });
    },
    selectFilter(filter) {
      this.addFilter(filter);
      this.emitInputValue();
    },
    addFilter(filter) {
      if (!this.filters.includes(filter)) {
        this.filters.push(filter);
      } else {
        const index = this.filters.indexOf(filter);
        if (index > -1) {
          this.filters.splice(index, 1);
        }
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.filter-container {
  @apply min-h-screen w-full bg-pink-900;
}
.container-title {
  @apply text-xl md:text-2xl text-gray-200 font-bold text-center tracking-wider select-none;
}
.filter {
  @apply text-sm font-normal text-left my-5 mx-3 md:mx-10 lg:mx-16 xl:mx-20;
}
.filter-title {
  @apply text-lg font-semibold select-none;
}
.filter-type {
  @apply cursor-pointer w-min my-1 p-1 rounded-md select-none;
}
.search-bar-container {
  @apply bg-pink-200 text-gray-900;
  @apply border-l-4 border-r-4 border-pink-900;
  @apply p-2 my-5 rounded-md grid;
}
.search-bar {
  @apply bg-transparent h-10 text-sm font-semibold focus:outline-none col-start-1;
}
.search-bar-icon {
  @apply h-7 w-7 fill-current col-start-2 m-auto;
}
.selected {
  @apply bg-pink-500 bg-opacity-40;
}
</style>
