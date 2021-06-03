<template>
  <div class="home">
    <the-banner></the-banner>
    <div class="main-home">

      <the-header class="header">
        <router-link class="slot router text-2xl text-gray-200 font-semibold" to="/create-post">Crear Publicación</router-link>
      </the-header>

      <div class="results">

        <base-home-filter
          class="filters-container"
          v-model="response"
          @keyup="filterAndSearchPosts"
          @click="filterAndSearchPosts"
        ></base-home-filter>

        <div class="cards-container" v-show="filteredPosts.length !== 0">
          <h1 class="results-title">Se encontraron {{ filteredPosts.length }} mascotas...</h1>
          <base-pet-card
            class="card"
            v-for="post in filteredPosts"
            :key="post"
            :routerParam="post._id"
            :imageSrc="post.pet.images[0].path"
            :imageAlt="getImageAlt(post)"
            :cardTitle="post.title"
          ></base-pet-card>
        </div>
        <div class="cards-container" v-show="filteredPosts.length === 0">
          <div class="no-results-container">
            <h1 class="no-results-title">
              No se encontraron resultados que coincidan con: {{ searchbarQuery }}
            </h1>
            <img
              src="../../assets/illustrations/good-pet.svg"
              class="no-results-illustration"
              alt="Ilustración de una mujer acariciando a un perrito."
            >
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

import TheBanner from './TheBanner.vue';
import TheHeader from './TheHeader.vue';
import BaseHomePetCard from '../layout/home/BaseHomePetCard.vue';
import BaseHomeFilter from '../layout/home/BaseHomeFilter.vue';

export default {
  components: {
    'the-banner': TheBanner,
    'the-header': TheHeader,
    'base-pet-card': BaseHomePetCard,
    'base-home-filter': BaseHomeFilter,
  },
  name: 'Home',
  data() {
    return {
      posts: [],
      filters: [],
      filteredPosts: [],
      searchbarQuery: '',
      response: null,
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      const getPostsURL = 'http://localhost:3000/get-posts';
      axios
        .get(getPostsURL)
        .then((posts) => {
          this.posts = posts.data.posts;
          this.filteredPosts = this.posts;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    getImageAlt(post) {
      return `Imagen de un ${post.pet.species}, 
        llamado ${post.pet.name}, 
        con ${post.pet.age} ${post.pet.ageTime} de edad. 
        El ${post.pet.species} es de color ${post.pet.colour}.`
    },
    filterAndSearchPosts() {
      this.searchbarQuery = this.response.query;
      const query = this.removeDiacritics(this.searchbarQuery);
      this.filters = this.response.filters;

      if (this.searchbarQuery !== '' && this.filters.length !== 0) {
        this.filteredPosts = this.posts.filter((post) => {
          return (this.removeDiacritics(post.title).includes(query) ||
                 this.removeDiacritics(post.pet.name).includes(query) ||
                 this.removeDiacritics(post.pet.species).includes(query) ||
                 this.removeDiacritics(post.pet.location.country).includes(query) ||
                 this.removeDiacritics(post.pet.location.city).includes(query) ||
                 this.removeDiacritics(post.pet.colour).includes(query)) &&
                 (this.filters.includes(this.removeDiacritics(post.pet.species)) ||
                 this.filters.includes(this.removeDiacritics(post.pet.gender)) ||
                 this.filters.includes(this.removeDiacritics(post.pet.colour)))
        });
      } else if (this.searchbarQuery !== '' && this.filters.length === 0) {
        this.searchPosts();
      } else {
        this.filterPosts();
      }
    },
    searchPosts() {
      this.searchbarQuery = this.response.query;
      const query = this.removeDiacritics(this.searchbarQuery);

      if (this.searchbarQuery !== '') {
        this.filteredPosts = this.posts.filter((post) => {
          return this.removeDiacritics(post.title).includes(query) ||
                 this.removeDiacritics(post.pet.name).includes(query) ||
                 this.removeDiacritics(post.pet.species).includes(query) ||
                 this.removeDiacritics(post.pet.location.country).includes(query) ||
                 this.removeDiacritics(post.pet.location.city).includes(query) ||
                 this.removeDiacritics(post.pet.colour).includes(query)
        });
      } else {
        this.filteredPosts = this.posts;
      }
    },
    filterPosts() {
      this.filters = this.response.filters;

      if (this.filters.length !== 0) {
        this.filteredPosts = this.posts.filter((post) => {
          return this.filters.includes(this.removeDiacritics(post.pet.species)) ||
                 this.filters.includes(this.removeDiacritics(post.pet.gender)) ||
                 this.filters.includes(this.removeDiacritics(post.pet.colour))
        });
      } else {
        this.filteredPosts = this.posts;
      }
    },
    removeDiacritics(str) {
      // Eliminar todos los signos diacríticos de un string
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
  },
}
</script>

<style lang="postcss" scoped>
.home {
  @apply h-screen justify-center items-center bg-gray-200;
}
.main-home {
  @apply h-screen;
}
.results-title {
  @apply col-span-full ml-10 text-gray-600 italic text-lg;
}
.results {
  @apply grid grid-cols-12 grid-rows-1;
}
.filters-container {
  @apply h-full col-span-3 lg:col-span-2;
}
.cards-container {
  @apply col-span-9 p-10 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
}
.card {
  @apply m-auto my-5;
}
.search-bar {
  @apply border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none;
}
.no-results-container {
  @apply col-span-full p-5;
}
.no-results-title {
  @apply text-pink-900 text-2xl font-semibold text-center;
}
.no-results-illustration {
  @apply mx-auto my-10;
}
</style>
