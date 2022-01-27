<template>
  <the-header></the-header>
  <router-view></router-view>
</template>


<script>
import TheHeader from './components/layouts/TheHeader.vue';
export default {
  components:{
    TheHeader
  },
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>

*{
  box-sizing: border-box;
}
body{
  padding: 0;
  margin: 0;
}

</style>