<template>
  <div class="fields-containers">
    <base-input
      v-model="user.type"
      class="form-input"
      id="name"
      name="name"
      :placeholder="user.type"
    />
    <base-input
      v-model="user.username"
      class="form-input"
      id="name"
      name="name"
      :placeholder="user.username"
    />
    <base-input
      v-model="user.mail"
      class="form-input"
      id="name"
      name="name"
      :placeholder="user.mail"
    />
    <base-input
      v-model="user.password"
      class="form-input"
      id="name"
      name="name"
      placeholder="****************"
    />
  </div>
</template>

<script>
import BaseInput from '../BaseInput.vue';

export default {
  components: {
    'base-input': BaseInput,
  },
  data() {
    return {
      user: {
        type: null,
        username: null,
        password: null,
        mail: null,
        description: null,
        fullName: null,
        location: {
          country: null,
          province: null,
          address: null,
        },
      },
    }
  },
}
</script>

<style lang="postcss" scoped>
.form-input {
  @apply border-b-0 w-full text-center;
}
</style>
