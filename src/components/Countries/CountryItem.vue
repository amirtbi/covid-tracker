<template>
  <li class="p-4 flex flex-row justify-between align-items-center">
    <p class="text-blue font-medium country-title font-Roboto">{{ title }}</p>
    <p class="font-medium country-statics font-sans">{{totalDeath}}</p>
  </li>

</template>

<script>
export default {
  props:['title','totalDeath'],

  
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300&display=swap');
p.font-Robot{
    font-family: 'Roboto';
}
</style>
