<template>
  <form
    @submit.prevent="allInputsAreValid"
    id="idPostForm"
    class="form"
    ref="postForm"
  >
    <base-input
      v-model="title"
      id="title"
      name="title"
      placeholder="Título de la publicación"
      :regex="regex.title"
      errorMsg="El título no puede estar vacío, ni tener espacios innecesarios, y debe contener entre 8 y 60 caracteres"
    ></base-input>
    <base-input
      v-model="pet.name"
      id="name"
      name="name"
      placeholder="Nombre del animal (Opcional)"
      :regex="regex.name"
      errorMsg="El nombre solo debe tener letras, sin espacios innecesarios, y puede contener hasta 30 caracteres"
    ></base-input>
    <div class="gender-container">
      <base-radio
        v-model="pet.gender"
        name="gender"
        value="Macho"
        :checked="true"
      />
      <base-radio v-model="pet.gender" name="gender" value="Hembra" />
    </div>
    <br />
    <div class="age-contanier">
      <label class="text-gray-500" for="age">
        Edad del animal
      </label>
      <base-input
        v-model.number="pet.age"
        id="age"
        name="age"
        type="number"
        placeholder="Edad del animal"
        :min="1"
        :regex="regex.age"
        errorMsg="La edad no puede estar vacía, solo puede contener números, éstos deben ser positivos y no superar los 4 dígitos"
      ></base-input>
      <base-select-option
        id="selectTime"
        name="time"
        v-model="pet.ageTime"
        :options="time"
        defaultValue="Edad expresada en"
        errorMsg="Debes seleccionar una opción válida"
      ></base-select-option>
    </div>
    <base-input
      v-model.number="pet.colour"
      id="color"
      name="color"
      placeholder="Color del animal (Opcional)"
      :regex="regex.colour"
      errorMsg="El color solo puede contener letras, sin espacios innecesarios, y no puede superar los 30 caracteres"
    ></base-input>
    <base-select-option
      id="animalType"
      name="animalType"
      v-model="pet.type"
      :options="animalTypes"
      defaultValue="Tipo de animal"
      errorMsg="Debes seleccionar una opción válida"
    ></base-select-option>
    <base-select-option
      id="species"
      name="species"
      v-model="pet.species"
      :options="speciesList"
      defaultValue="Especie"
      errorMsg="Debes seleccionar una opción válida"
    ></base-select-option>
    <label class="text-gray-500" for="quantity">
      Cantidad de animales
    </label>
    <base-input
      v-model.number="pet.quantity"
      id="quantity"
      name="quantity"
      type="number"
      placeholder="Cantidad de animales (Mínimo 1)"
      :min="1"
      :regex="regex.age"
      errorMsg="La cantidad no puede estar vacía, solo puede contener números, éstos deben ser positivos y no superar los 4 dígitos"
    ></base-input>
    <base-text-area
      v-model="pet.characteristics"
      :regex="regex.animalCharacteristics"
      placeholder="Otras características del animal:&#10;Raza&#10;Pelaje&#10;Tamaño&#10;Esperanza de vida&#10;Estado del animal&#10;Vacunas"
      errorMsg="Las características pueden contener letras, números y símbolos, sin espacios innecesarios, hasta 250 caracteres como máximo"
    />
    <div class="location-container">
      <label class="text-gray-500" for="location">
        ¿Dónde se encuentra el animal?
      </label>
      <base-radio
        v-model="pet.location"
        id="location"
        name="location"
        value="Usar la localidad configurada en Mi Perfil"
        :checked="true"
      />
    </div>
    <br />
    <div class="adoption-conditions-container">
      <label class="text-gray-500" for="location"
        >¿Qué condiciones debe cumplir el adoptante?
      </label>
      <base-text-area
        v-model="pet.adoptionConditions"
        :regex="regex.adoptionConditions"
        placeholder="1. Condición1&#10;2. Condición2&#10;3. Condición3&#10;&#10;&#10;..."
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
    <div
      :class="['error-message-container', error.visibility, error.title]"
      role="alert"
    >
      <strong class="font-bold">{{ error.title }}!</strong><br />
      <span class="error-message">{{ error.message }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="error.visibility = 'hidden'"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
    <base-button
      name="submit-button"
      id="submit-button"
      class="submit"
      type="submit"
      buttonText="Publicar"
      :isDisabled="false"
    />
  </form>
</template>
<script>
import axios from 'axios';

import BaseButton from './layout/BaseButton.vue';
import BaseInput from './layout/BaseInput.vue';
import BaseSelectOption from './layout/BaseSelectOption.vue';
import BaseTextArea from './layout/BaseTextArea.vue';
import BaseRadio from './layout/BaseRadio.vue';

export default {
  components: {
    'base-input': BaseInput,
    'base-button': BaseButton,
    'base-select-option': BaseSelectOption,
    'base-text-area': BaseTextArea,
    'base-radio': BaseRadio,
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
        gender: 'Macho',
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
        // this.user._id
        author: '60aaf9145bfd89325c11bac2',
        title: this.title.value,
        pet: {
          gender: this.pet.gender,
          age: Number(this.pet.age.value),
          ageTime: this.pet.ageTime.value,
          species: this.pet.species.value,
          type: this.pet.type.value,
          quantity: Number(this.pet.quantity.value),
          // this.user.location
          location: {
            country: 'Argentina',
            city: 'Mendoza',
            address: 'Teurlay 706',
          },
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
      axios
        .get(getUserURL)
        .then((user) => {
          this.user = user.data;
        })
        .catch((error) => {
          console.log(error.response.data);
          // this.$router.push({ name: 'Signin' });
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
          // redireccionar a post/:postId para ver la publicación
          setTimeout(() => this.$router.push({ name: 'Home' }), 4000);
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
  @apply grid grid-rows-1;
}
.input-file {
  @apply h-full w-full opacity-0;
}
.images-name-size {
  @apply text-gray-700 font-bold italic text-xs;
}
.error-message-container {
  @apply bg-red-100 border border-red-400 text-red-700;
  @apply w-4/5 mx-auto px-4 py-3 rounded relative;
}
.error-message {
  @apply block sm:inline;
}
.Error {
  @apply bg-red-100 border-red-400 text-red-700;
}
.Éxito {
  @apply bg-green-100 border-green-400 text-green-700;
}
</style>
