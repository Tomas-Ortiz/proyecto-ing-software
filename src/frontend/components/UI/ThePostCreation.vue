<template>
  <base-post-creation-card>
    <template #title>
      <h1 class="title">{{ postFormData.title }}</h1>
    </template>
    <template #form>
      <post-form></post-form>
    </template>
  </base-post-creation-card>
</template>

<script>
import BasePostCreationCard from '../layout/post/BasePostCreationCard.vue';
import PostForm from '../PostForm.vue';

export default {
  components: {
    'base-post-creation-card': BasePostCreationCard,
    'post-form': PostForm,
  },
  data() {
    return {
      postFormData: {
        title: 'Crea tu publicación',
      },
    };
  },
};
</script>

<style lang="postcss" scoped>
.title {
  @apply text-3xl font-semibold text-pink-900;
}
</style>
