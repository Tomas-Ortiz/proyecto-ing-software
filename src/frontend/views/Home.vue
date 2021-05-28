<template>
  <div class="home">
    <the-banner></the-banner>
    <div class="main-home">
      <the-header class="header"></the-header>
      <div class="results">
        <base-home-filter class="filters-container"></base-home-filter>
        <div class="cards-container">
          <base-pet-card class="card"></base-pet-card>
          <base-pet-card class="card"></base-pet-card>
          <base-pet-card class="card"></base-pet-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheBanner from '../components/UI/TheBanner.vue';
import TheHeader from '../components/UI/TheHeader.vue';
import BaseHomePetCard from '../components/layout/home/BaseHomePetCard.vue';
import BaseHomeFilter from '../components/layout/home/BaseHomeFilter.vue';

export default {
  components: {
    'the-banner': TheBanner,
    'the-header': TheHeader,
    'base-pet-card': BaseHomePetCard,
    'base-home-filter': BaseHomeFilter,
  },
  name: 'Home',
};
</script>

<style lang="postcss" scoped>
.home {
  @apply h-screen justify-center items-center bg-gray-200;
}
.main-home {
  @apply h-screen;
}
.results {
  @apply grid grid-cols-12;
}
.filters-container {
  @apply col-span-3 lg:col-span-2;
}
.cards-container {
  @apply col-span-9 p-10 md:grid md:grid-cols-2 lg:grid-cols-3;
}
.card {
  @apply m-auto my-5;
}
</style>
