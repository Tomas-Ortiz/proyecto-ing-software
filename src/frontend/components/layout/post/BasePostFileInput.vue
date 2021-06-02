<template>
  <div class="file-container">
    <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
      <div class="md:flex">
        <div class="w-full p-3">
          <div class="images-container">

            <div class="absolute">
              <span class="block text-gray-400 font-normal">
                <base-svg-icon name="camera" class="camera-icon"></base-svg-icon>
                <p>Sube aquí las imágenes del animal</p>
                <p>(.png .jpg, .jfif.gif, .ico)</p>
              </span>
            </div>

            <input
              class="input-file"
              type="file"
              accept="image/*"
              id="petImages"
              name="petImages"
              @change="uploadImage"
              multiple
            >
          </div>

          <ul class="images-name-size">
            <li v-for="image in images.petImages" :key="image.name">
              {{ image.name }} ({{ (image.size / 1024).toFixed(2) }} KB)
            </li>
          </ul>

          <label>
            {{ images.filesNumber }}
            imágenes subidas
            ({{ images.totalSizeMB }} MB)
          </label>

          <base-error-message
            :errorTitle="error.title"
            :errorMsg="error.message"
            :class="error.visibility"
            @click="error.visibility = 'hidden'"
          ></base-error-message>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseErrorMessage from '../BaseErrorMessage.vue';
import BaseSVGIcon from '../BaseSVGIcon.vue';

export default {
  components: {
    'base-error-message': BaseErrorMessage,
    'base-svg-icon': BaseSVGIcon,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      images: {
        petImages: null,
        filesNumber: 0,
        totalSizeMB: 0,
      },
      error: {
        message: '',
        title: 'Error',
        visibility: 'hidden',
      },
    }
  },
  methods: {
    uploadImage(event) {
      this.images.imagesName = [];
      this.images.petImages = event.target.files;
      if (this.imagesAreValid()) {
        this.error.visibility = 'hidden';
        this.emitInputValue();
      } else {
        this.resetFilesValues();
      }
    },
    emitInputValue() {
      this.$emit('update:modelValue', {
        value: this.images,
        isValid: this.imagesAreValid,
      });
    },
    imagesAreValid() {
      if (!this.images.petImages) {
        return false;
      }
      this.images.filesNumber = this.images.petImages.length;
      this.images.totalSizeMB = (this.totalSize() / 1024 / 1024).toFixed(2);
      if (
        this.images.filesNumber < 1 ||
        this.images.filesNumber > 5 ||
        this.images.totalSizeMB > 10 ||
        !this.fileTypesAreValid()
      ) {
        this.showMessage(
          'Error',
          'Solo puedes subir entre 1 y 5 imágenes, con un tamaño límite de 10 MB',
          'block'
        );
        return false;
      }
      return true;
    },
    fileTypesAreValid() {
      Object.keys(this.images.petImages).forEach((key) => {
        if (!this.images.petImages[key].type.includes('image')) {
          return false;
        }
      });
      return true;
    },
    totalSize() {
      return Object.values(this.images.petImages).reduce(
        (total, { size }) => total + size,
        0
      );
    },
    resetFilesValues() {
      this.images.petImages = null;
      this.images.filesNumber = 0;
      this.images.totalSizeMB = 0;
    },
    showMessage(title, msg, visibility) {
      this.error.title = title;
      this.error.message = msg;
      this.error.visibility = visibility;
    },
  },
}
</script>

<style lang="postcss" scoped>
.images-container {
  @apply mx-auto w-full relative border-dotted h-48 rounded-lg border-2 border-pink-700 bg-gray-100 flex justify-center items-center;
}
.camera-icon {
  @apply w-2/12;
}
</style>
