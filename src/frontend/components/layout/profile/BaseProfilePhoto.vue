<template>
    <div class="photo-container">
        <img
            class="profile-photo"
            src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt="Profile image"
        />
        <base-button
            buttonText="Eliminar Cuenta"
            class="delete-account-btn"
        >
        </base-button>
    </div>
</template>

<script>
import BaseButton from '../BaseButton.vue';

export default {
  components: {
    'base-button': BaseButton
  },
}
</script>

<style lang="postcss" scoped>
.photo-container {
    @apply w-full mt-7 md:grid md:grid-rows-3;
}
.profile-photo {
    @apply mx-auto block object-cover object-center;
    @apply w-48 h-48 rounded-full cursor-pointer;
}
.delete-account-btn {
    @apply w-5/12 md:w-4/5;
    @apply block mx-auto my-2 bg-red-500 md:row-start-4;
}
</style>
