<template>
  <div class="form-container">
    <div class="title-container">
      <h1 class="title">Género:</h1>
    </div>
    <div class="grid-container">
      <div class="gender-container" v-for="gender in genders" :key="gender">
        <base-gender-icon
          :class="['gender', { selected: selectedGender == translateGenderValue(gender) }]"
          :name="gender"
          @click="emitInputValue(gender)">
        </base-gender-icon>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import BaseGenderIcon from '../BaseSVGIcon.vue'

export default {
  components: {
    'base-gender-icon': BaseGenderIcon,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      genders: ['male', 'female', 'genderless'],
      selectedGender: 'genderless'
    }
  },
  methods: {
    translateGenderValue(gender) {
      if (gender === 'male') {
        return 'Macho';
      }
      if (gender === 'female') {
        return 'Hembra';
      }
      return 'Sin Género';
    },
    emitInputValue(gender) {
      this.selectedGender = this.translateGenderValue(gender);
      this.$emit('update:modelValue', {
        value: this.selectedGender,
        isValid: true
      });
    },
  },
}
</script>

<style lang="postcss" scoped>
.form-container {
  @apply grid py-5 md:grid-cols-2 md:py-0;
}
.grid-container {
  @apply grid md:grid-cols-4 grid-cols-3;
}
.title {
  @apply text-left font-semibold text-lg md:text-xl xl:text-2xl;
}
.gender-container,
.title-container {
  @apply py-2 md:py-5;
}
.gender {
  @apply w-14 p-1 border-4 rounded-full cursor-pointer border-gray-400;
}
.gender.selected {
  @apply border-green-500;
}
</style>
