<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/profile/test-id">Profile</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="postcss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  @apply z-30 p-3 w-full text-center bg-pink-600;
}

#nav a {
  @apply font-bold text-gray-200;
}

#nav a.router-link-exact-active {
  @apply text-red-400;
}
</style>
