<template>
  <div class="home">
    <the-banner></the-banner>
    <div class="main-home">

      <the-header class="header">
        <router-link class="slot router text-2xl text-gray-200 font-semibold" to="/create-post">Crear Publicación</router-link>
      </the-header>

      <div class="results">

        <base-home-filter class="filters-container"></base-home-filter>

        <div class="cards-container">
          <base-pet-card
            v-for="post in posts" :key="post"
            class="card"
            :routerParam="post._id"
            :imageSrc="post.pet.images[0].path"
            :imageAlt="getImageAlt(post)"
            :cardTitle="post.title"
          ></base-pet-card>
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
      seachbarQuery: [],
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
</style>
