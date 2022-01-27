<template>
  <li class="p-4 flex flex-row justify-between align-items-center">
    <p class="country-title">{{ title }}</p>
    <p class="country-statics">{{totalDeath}}</p>
  </li>
  <!-- <li class="p-4 flex flex-row justify-between align-items-center">
        <p class="country-title">Iran</p>
        <p class="country-statics">19990</p>
      </li> -->
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required:false
    },
    totalDeath:{
        type:String,
        required:false
    }
  },
  data() {
    return {};
  },
};
</script>
