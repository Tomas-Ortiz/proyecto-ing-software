<template>
  <div class="card-container">
    <router-link :to="`/post/${routerParam}`">
      <img :src="imageSrc" :alt="imageAlt" class="card-image" />
      <hgroup>
        <h1 class="card-title">{{ cardTitle }}</h1>
        <h2 class="card-date">{{ cardDate }}</h2>
      </hgroup>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: false,
      default:
        'https://images.pexels.com/photos/6869638/pexels-photo-6869638.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    },
    imageAlt: {
      type: String,
      required: false,
      default: 'Imagen de Mascota',
    },
    cardTitle: {
      type: String,
      required: false,
      default: 'Busco dueño para mi mascota!',
    },
    cardDate: {
      type: String,
      required: false,
      default: '4 de junio de 2021',
    },
    routerParam: {
      type: String,
      required: false,
      default: 'testing',
    },
  },
};
</script>

<style lang="postcss" scoped>
.card-container {
  @apply w-60 max-h-80 rounded-lg bg-gray-200 shadow-2xl;
}
.card-image {
  @apply w-60 h-48 object-cover object-center rounded-t-lg;
}
.card-title {
  @apply h-16 text-xl p-2 m-2 font-semibold;
  @apply overflow-hidden overflow-ellipsis text-center;
}
.card-date {
  @apply text-sm p-2 m-2 italic;
  @apply overflow-hidden overflow-ellipsis text-right;
}
</style>
