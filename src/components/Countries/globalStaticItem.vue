<template>
  <div class="statics-row w-100  pt-2 pr-6 pl-6 flex flex-row justify-between items-center">
    <div
      :class="Classes"
      class="box-container rounded w-100 mr-4 box box_newDeath"
    ></div>
    <p
      class="font-medium text-md text-primary-200 text-bold font-sans flex-1 box-title"
    >
      {{ title }}
    </p>
    <p class="font-bold text-primary-200 text-md font-sans box-value">
      {{ amount.toLocaleString()}}
    </p>
  </div>
</template>

<script>
export default {
  props: ["title"],
  computed: {
    Classes() {
      if (this.title === "NewConfirmed") {
        return 'NewConfirmed';
      } else if (this.title === "NewDeaths") {
        return 'NewDeaths';
      } else {
        return 'TotalDeaths';
      }
    },

    amount(){
        if(this.title === 'NewConfirmed'){
            return this.$store.getters.newConfirmed;
        }else if(this.title === 'TotalDeaths'){
            return this.$store.getters.totalDeaths;
        }else{
             return this.$store.getters.newDeaths;
        }
    }
  },
};
</script>

<style scoped>
div.box-container {
  width: 1rem;
  height: 1rem;
}

.TotalDeaths {
  background-color: #67e8f9;
}
.NewDeaths {
  background-color:#ffeb00;
}
.NewConfirmed {
  background-color: tomato;
}
</style>
