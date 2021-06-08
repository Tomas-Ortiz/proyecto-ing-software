<template>
  <div v-if="this.post != undefined" class="grid gap-4 grid-cols-2 m-8">
    <div class="photo-container">
      <div class="carousel relative shadow-2xl bg-white">
        <div
          v-for="(image, index) in post.pet.images"
          :key="image"
          class="carousel-inner relative overflow-hidden w-full"
        >
          <input
            v-if="index == 0"
            class="carousel-open"
            type="radio"
            :id="'carousel-' + (index + 1)"
            name="carousel"
            aria-hidden="true"
            hidden=""
            checked
          />
          <input
            v-else
            class="carousel-open"
            type="radio"
            :id="'carousel-' + (index + 1)"
            name="carousel"
            aria-hidden="true"
            hidden=""
          />
          <!-- Slide -->
          <div class="carousel-item absolute opacity-0" style="height:50vh;">
            <div
              class="block h-full w-full bg-indigo-500 text-white text-5xl text-center"
              :style="{
                backgroundImage: 'url(' + image.path + ')',
              }"
            ></div>
          </div>
          <!-- Flechas (prev y next) -->
          <label
            :for="'carousel-' + (index + 1 - 1)"
            :class="
              'prev control-' +
                (index + 1) +
                ' w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto'
            "
            >‹</label
          >
          <label
            :for="'carousel-' + (index + 1 + 1)"
            :class="
              'next control-' +
                (index + 1) +
                ' w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto'
            "
            >›</label
          >
          <!-- Menú de slides (puntos) -->
          <ol class="carousel-indicators">
            <li
              v-for="(image, index) in post.pet.images"
              :key="image"
              class="inline-block mr-3"
            >
              <label
                :for="'carousel-' + (index + 1)"
                class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700"
                >•</label
              >
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div v-if="this.user != undefined" class="fields-container">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h2
            class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl"
          >
            {{ post.title }}
          </h2>
          <p class="text-gray-500">Publicado por {{ this.user.fullname }}</p>
          <p class="text-gray-500">
            {{ post.publishingDate }}
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div
              v-if="this.post.pet.name"
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Nombre
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ post.pet.name }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Género
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ post.pet.gender }}
              </dd>
            </div>
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Edad
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ post.pet.age }} {{ post.pet.ageTime }}
              </dd>
            </div>
            <div
              v-if="this.post.pet.colour"
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Color
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ post.pet.colour }}
              </dd>
            </div>
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Tipo
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ post.pet.type }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Especie
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ post.pet.species }}
              </dd>
            </div>
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Cantidad
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ post.pet.quantity }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Ubicación
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ post.pet.location.country }}, {{ post.pet.location.city }},
                {{ post.pet.location.address }}
              </dd>
            </div>
            <div
              v-if="this.post.pet.characteristics"
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Características
              </dt>
              <!-- con <pre> HTML respeta los saltos de línea -->
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <pre>{{ post.pet.characteristics }} </pre>
              </dd>
            </div>
            <div
              v-if="this.post.pet.adoptionConditions"
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Condiciones de adopción
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <pre>{{ post.pet.adoptionConditions }}</pre>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <div v-if="this.user != undefined" class="contact-container">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h2
            class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl"
          >
            Contacto
          </h2>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                <contact-icon class="contact-icon" name="mail"> </contact-icon>
                Correo electrónico
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ user.account.email }}
              </dd>
            </div>
            <div
              v-for="(contact, index) in user.contact"
              :key="contact"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                <contact-icon
                  class="contact-icon"
                  :name="contact.contactType.toLowerCase().trim()"
                >
                </contact-icon>
                {{ contact.contactType }}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ contact.value }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BaseContactIcon from '../BaseSVGIcon.vue';

export default {
  components: {
    'contact-icon': BaseContactIcon,
  },
  created() {
    this.getPost();
  },
  data() {
    return {
      post: undefined,
      user: undefined,
    };
  },
  methods: {
    getPost() {
      const postId = this.$route.params.id;
      const getPostURL = `http://localhost:3000/get-post/${postId}`;
      axios
        .get(getPostURL)
        .then((response) => {
          this.post = response.data.post;
          this.getUser();
        })
        .catch((error) => {
          this.$router.push({ name: 'PageNotFound' });
        });
    },
    getUser() {
      const getUserURL = `http://localhost:3000/getUser/${this.post.author}`;
      axios.get(getUserURL).then((response) => {
        this.user = response.data.msg;
      });
    },
  },
};
</script>

<style lang="postcss">
.carousel-open:checked + .carousel-item {
  position: static;
  opacity: 100;
}
.carousel-item {
  -webkit-transition: opacity 0.6s ease-out;
  transition: opacity 0.6s ease-out;
}
#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3,
#carousel-4:checked ~ .control-4,
#carousel-5:checked ~ .control-5 {
  display: block;
}
.carousel-indicators {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
}
#carousel-1:checked
  ~ .control-1
  ~ .carousel-indicators
  li:nth-child(1)
  .carousel-bullet,
#carousel-2:checked
  ~ .control-2
  ~ .carousel-indicators
  li:nth-child(2)
  .carousel-bullet,
#carousel-3:checked
  ~ .control-3
  ~ .carousel-indicators
  li:nth-child(3)
  .carousel-bullet,
#carousel-4:checked
  ~ .control-4
  ~ .carousel-indicators
  li:nth-child(4)
  .carousel-bullet,
#carousel-5:checked
  ~ .control-5
  ~ .carousel-indicators
  li:nth-child(5)
  .carousel-bullet {
  color: #2b6cb0;
}
.contact-icon {
  @apply w-6 inline-block align-top mr-4;
}
</style>
