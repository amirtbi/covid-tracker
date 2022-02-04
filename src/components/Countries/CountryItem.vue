<template>
  <li @click="clickHandler"  class="p-4 flex w-100 flex-row justify-between items-center">
    <p  class="text-primary-200 font-bold text-sm country-title font-Roboto">{{ title }}</p>
    <p class="text-primary-200 font-medium text-md  country-statics font-sans">{{totalDeath}}</p>
  </li>

</template>

<script>
export default {
  emits:['selectedCountry'],
  props:['title','totalDeath'],

  
  data() {
    return {};
  },
  methods:{
    // emiting country title after clicking
    clickHandler(){
      this.$emit("selectedCountry",this.title);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300&display=swap');
p.font-Robot{
    font-family: 'Roboto';
}
li{
  cursor: pointer;
}
li:hover{
  background-color: rgb(67, 67, 87);
  }
</style>
