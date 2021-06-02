<template>
  <div class="postCreation-background">
    <the-post-creation></the-post-creation>
  </div>
</template>

<script>
import ThePostCreation from '../components/UI/ThePostCreation.vue';

export default {
  components: {
    'the-post-creation': ThePostCreation,
  },
  name: 'PostCreation',
};
</script>
