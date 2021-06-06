<template>
  <form
    @submit.prevent="allInputsAreValid"
    id="idPostForm"
    class="form"
    ref="postForm"
  >
    <div class="small-container">
      <label class="input-label" for="title">
        Título de la publicación
      </label>
      <base-input
        v-model="title"
        id="title"
        name="title"
        size="big"
        placeholder="Título de la publicación"
        :regex="regex.title"
        errorMsg="El título no puede estar vacío, ni tener espacios innecesarios, y debe contener entre 8 y 60 caracteres"
      ></base-input>
    </div>
    <div class="small-container">
      <label class="input-label" for="name">
        Nombre de la mascota
      </label>
      <base-input
        v-model="pet.name"
        id="name"
        name="name"
        size="big"
        placeholder="Nombre"
        :regex="regex.name"
        errorMsg="El nombre solo debe tener letras, sin espacios innecesarios, y puede contener hasta 30 caracteres"
      ></base-input>
    </div>

    <base-gender-form v-model="pet.gender"></base-gender-form>

    <div class="small-container">
      <label class="input-label" for="age">
        Edad de la mascota
      </label>
      <div class="grid">
        <base-input
          v-model.number="pet.age"
          id="age"
          name="age"
          type="number"
          size="small"
          placeholder="Edad"
          :min="1"
          :regex="regex.age"
          errorMsg="La edad no puede estar vacía, solo puede contener números, éstos deben ser positivos y no superar los 4 dígitos"
        ></base-input>
        <base-select-option
          id="selectTime"
          name="time"
          v-model="pet.ageTime"
          :options="time"
          defaultValue="expresada en..."
          errorMsg="Debes seleccionar una opción válida"
          class="text-left w-44"
        ></base-select-option>
      </div>
    </div>
    <div class="small-container">
      <label class="input-label" for="color">
        Color de la mascota
      </label>
      <base-input
        v-model.number="pet.colour"
        id="color"
        name="color"
        size="small"
        placeholder="Color"
        :regex="regex.colour"
        errorMsg="El color solo puede contener letras, sin espacios innecesarios, y no puede superar los 30 caracteres"
      ></base-input>
    </div>

    <div class="small-container">
      <label class="input-label" for="animalType">
        Tipo de mascota
      </label>
      <base-select-option
        id="animalType"
        name="animalType"
        v-model="pet.type"
        :options="animalTypes"
        defaultValue="Tipo de mascota"
        errorMsg="Debes seleccionar una opción válida"
        class="text-left"
      ></base-select-option>
    </div>

    <div class="small-container">
      <label class="input-label" for="species">
        Especie
      </label>
      <base-select-option
        id="species"
        name="species"
        v-model="pet.species"
        :options="speciesList"
        defaultValue="Especie"
        errorMsg="Debes seleccionar una opción válida"
        class="text-left"
      ></base-select-option>
    </div>

    <div class="small-container">
      <label class="input-label" for="location">
        Ubicación de la mascota
      </label>
      <base-radio
        v-model="pet.location"
        id="location"
        name="location"
        value="Usar la ubicación de Mi Perfil"
        :checked="true"
        class="text-left w-full"
      />
    </div>

    <div class="small-container">
      <label class="input-label" for="quantity">Cantidad de animales</label>
      <base-input
        v-model.number="pet.quantity"
        id="quantity"
        name="quantity"
        size="small"
        type="number"
        placeholder="Cantidad"
        :min="1"
        :regex="regex.age"
        errorMsg="La cantidad no puede estar vacía, solo puede contener números, éstos deben ser positivos y no superar los 4 dígitos"
      ></base-input>
    </div>

    <div class="big-container">
      <label class="input-label mx-auto" for="description">
        Breve descripción de tu mascota
      </label>
      <base-text-area
        id="description"
        changeStyle="post-creation-style"
        v-model="pet.characteristics"
        :regex="regex.animalCharacteristics"
        placeholder="Otras características del animal:&#10;Raza&#10;Pelaje&#10;Tamaño&#10;Esperanza de vida&#10;Estado del animal&#10;Vacunas"
        errorMsg="Las características pueden contener letras, números y símbolos, sin espacios innecesarios, hasta 250 caracteres como máximo"
      />
    </div>

    <div class="big-container">
      <label class="input-label mx-auto" for="location">
        ¿Qué condiciones debe cumplir el adoptante?
      </label>
      <base-text-area
        id="location"
        changeStyle="post-creation-style"
        v-model="pet.adoptionConditions"
        :regex="regex.adoptionConditions"
        placeholder="1. Condición 1&#10;2. Condición 2&#10;3. Condición 3&#10;..."
        errorMsg="Las condiciones de adopción puede contener letras, números y símbolos, hasta 250 caracteres como máximo"
      />
    </div>
    <div class="file-container">
      <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div class="md:flex">
          <div class="w-full p-3">
            <div
              class="relative border-dotted h-48 rounded-lg border-2 border-blue-700 bg-gray-100 flex justify-center items-center"
            >
              <div class="absolute">
                <div class="flex flex-col items-center">
                  <i class="fa fa-folder-open fa-4x text-blue-700"></i>
                  <span class="block text-gray-400 font-normal"
                    ><i
                      >Sube aquí las imágenes del animal<br />(.png .jpg, .jfif
                      .gif, .ico)</i
                    ></span
                  >
                </div>
              </div>
              <input
                class="input-file"
                type="file"
                accept="image/*"
                id="petImages"
                name="petImages"
                @change="uploadImage"
                multiple
              />
            </div>
            <br />
            <ul class="images-name-size">
              <li v-for="image in this.images.petImages" :key="image">
                {{ image.name }} ({{ (image.size / 1024).toFixed(2) }} KB)
              </li>
            </ul>
            <br />
            <label
              ><strong
                >{{ images.filesNumber }} imágenes seleccionadas ({{
                  images.totalSizeMB
                }}
                MB)</strong
              ></label
            >
          </div>
        </div>
      </div>
    </div>
    <base-error-message
      :errorMsg="error.message"
      :errorTitle="error.title"
      :class="[errorMessageVisibility, size]"
      @click="errorMessageVisibility = 'hidden'"
    ></base-error-message>
    <base-button
      name="submit-button"
      id="submit-button"
      class="submit"
      type="submit"
      buttonText="Publicar"
    />
  </form>
</template>
<script>
import axios from 'axios';

import BaseButton from './layout/BaseButton.vue';
import BaseSelectOption from './layout/BaseSelectOption.vue';
import BaseTextArea from './layout/BaseTextArea.vue';
import BaseRadio from './layout/BaseRadio.vue';
import BaseGenderForm from './layout/post/BasePostGenderForm.vue';
import BasePostInput from './layout/post/BasePostInput.vue';
import BaseErrorMessage from './layout/BaseErrorMessage.vue';
import BasePostFileInput from './layout/post/BasePostFileInput.vue';

export default {
  components: {
    'base-button': BaseButton,
    'base-select-option': BaseSelectOption,
    'base-text-area': BaseTextArea,
    'base-radio': BaseRadio,
    'base-gender-form': BaseGenderForm,
    'base-input': BasePostInput,
    'base-error-message': BaseErrorMessage,
    'base-post-file-input': BasePostFileInput,
  },
  created() {
    this.getUser();
  },
  mounted() {
    document.getElementById('age').value = 0;
    document.getElementById('quantity').value = 0;
  },
  data() {
    return {
      user: {},
      title: '',
      postId: '',
      post: {},
      pet: {
        name: '',
        gender: 'Sin Género',
        age: 0,
        ageTime: '',
        colour: '',
        species: '',
        type: '',
        quantity: 0,
        location: '',
        characteristics: '',
        adoptionConditions: '',
      },
      images: {
        petImages: null,
        filesNumber: 0,
        totalSizeMB: 0,
      },
      animalTypes: ['Mamífero', 'Ave', 'Pez'],
      speciesList: ['Perro', 'Gato', 'Hámster', 'Pájaro', 'Pez'],
      time: ['Años', 'Meses', 'Semanas', 'Días'],
      regex: {
        title: /^([A-Za-zñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9'¡!¿?#|$%&/()=+.,*@:;[\]_\-][\s]{0,1}){8,60}$/,
        name: /^([a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){0,30}$/,
        age: /^[1-9]([0-9]{0,3})$/,
        colour: /^([a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){0,30}$/,
        animalCharacteristics: /^([\s]{0}[a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9¡!¿?#'|°"$%&/()=+.,{}*¨¨´´@:;[\]_-][\s]{0,1}){0,250}$/,
        adoptionConditions: /^([\s]{0}[a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9¡!¿?#'|°"$%&/()=+.,{}*¨¨´´@:;[\]_-][\s]{0,1}){0,250}$/,
      },
      error: {
        message: '',
        title: 'Error',
        visibility: 'hidden',
      },
      errorMessageVisibility: 'hidden',
    };
  },
  methods: {
    allInputsAreValid() {
      if (this.validFields()) {
        this.createPostData();
        this.emitPostData();
      } else {
        const message =
          'Algunos de los campos ingresados no son correctos, asegurate de que ninguno se encuentre vacío';
        this.showMessage('Error', message, 'block');
      }
    },
    createPostData() {
      this.post = {
        author: this.user._id,
        title: this.title.value,
        pet: {
          gender: this.pet.gender.value,
          age: Number(this.pet.age.value),
          ageTime: this.pet.ageTime.value,
          species: this.pet.species.value,
          type: this.pet.type.value,
          quantity: Number(this.pet.quantity.value),
          location: this.user.location,
        },
      };
      // Campos opcionales, solo se asignan al objeto "post" si existen
      // Código a refactorizar
      if (this.pet.name && this.pet.name.value.trim() !== '') {
        this.post.pet.name = this.pet.name.value;
      }
      if (this.pet.colour && this.pet.colour.value.trim() !== '') {
        this.post.pet.colour = this.pet.colour.value;
      }
      if (
        this.pet.characteristics &&
        this.pet.characteristics.value.trim() !== ''
      ) {
        this.post.pet.characteristics = this.pet.characteristics.value;
      }
      if (
        this.pet.adoptionConditions &&
        this.pet.adoptionConditions.value.trim() !== ''
      ) {
        this.post.pet.adoptionConditions = this.pet.adoptionConditions.value;
      }
    },
    validFields() {
      return (
        this.title.isValid &&
        this.pet.age.isValid &&
        this.pet.ageTime.isValid &&
        this.pet.type.isValid &&
        this.pet.species.isValid &&
        this.pet.quantity.isValid &&
        this.imagesAreValid() &&
        this.optionalFieldsAreValid()
      );
    },
    optionalFieldsAreValid() {
      const validOptionalFields = [];
      validOptionalFields.push(this.pet.name.isValid);
      validOptionalFields.push(this.pet.colour.isValid);
      validOptionalFields.push(this.pet.characteristics.isValid);
      validOptionalFields.push(this.pet.adoptionConditions.isValid);
      // si alguno de estos campos no son validos (no cumplen la ER) se devuelve false
      return !validOptionalFields.includes(false);
    },
    getUser() {
      const getUserURL = 'http://localhost:3000/getUser';
      const config = {
        headers: { Authorization: localStorage.getItem('token') },
      };
      axios
        .get(getUserURL, config)
        .then((user) => {
          this.user = user.data.msg;
        })
        .catch(() => {
          this.$router.push({ name: 'Login' });
        });
    },
    emitPostData() {
      const createPostURL = 'http://localhost:3000/create-post';
      axios
        .post(createPostURL, this.post)
        .then((response) => {
          // Si se crea con éxito el post recién ahí se envían las imágenes
          // postId para saber el post al que hay que agregarle las imágenes
          if (response.status === 200) {
            this.postId = response.data.postId;
            this.emitPostImages();
          }
        })
        .catch((error) => {
          this.showMessage('Error', error.response.data, 'block');
        });
    },
    emitPostImages() {
      const formData = new FormData();
      const uploadImagesURL = 'http://localhost:3000/upload-images';
      formData.append('postId', this.postId);
      for (const i of Object.keys(this.images.petImages)) {
        formData.append('files', this.images.petImages[i]);
      }
      axios
        .post(uploadImagesURL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.showMessage('Éxito', response.data.msg, 'block');
          document.getElementById('submit-button').disabled = true;
          setTimeout(
            () => this.$router.push({ path: `/post/${this.postId}` }),
            4000
          );
        })
        .catch((error) => {
          this.showMessage('Error', error.response.data, 'block');
        });
    },
    uploadImage(event) {
      this.images.imagesName = [];
      this.images.petImages = event.target.files;
      if (this.imagesAreValid()) {
        this.error.visibility = 'hidden';
      } else {
        this.resetFilesValues();
      }
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
    // Bytes
    totalSize() {
      return Object.values(this.images.petImages).reduce(
        (total, { size }) => total + size,
        0
      );
    },
    fileTypesAreValid() {
      for (const i of Object.keys(this.images.petImages)) {
        const { type } = this.images.petImages[i];
        if (!type.includes('image')) {
          return false;
        }
      }
      return true;
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
};
</script>
<!-- No colocar scoped, genera un error desconocido (investigar) -->
<style lang="postcss">
.form {
  @apply grid grid-rows-1 py-5;
}
.small-container {
  @apply grid grid-cols-2 grid-rows-none;
}
.big-container {
  @apply grid;
}
.small-container,
.big-container {
  @apply my-5;
}
.photo-container {
  @apply grid md:mx-10;
}
.input-label {
  @apply font-semibold text-lg md:text-xl xl:text-2xl text-left;
}
.input-file {
  @apply h-full w-full opacity-0;
}
.images-name-size {
  @apply text-gray-700 font-bold italic text-xs;
}
</style>
