<template>
  <the-header></the-header>
  <main class="bg-gray flex flex-row w-100">
    <router-view></router-view>
  </main>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  position: relative;
  height: 100%;
}

#app {
  height: 100%;
}
</style>
