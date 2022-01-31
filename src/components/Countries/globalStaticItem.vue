<template>
  <div class="statics-row w-100 p-6 flex flex-row justify-between items-center">
    <div
      :class="Classes"
      class="box-container rounded w-100 mr-4 box box_newDeath"
    ></div>
    <p
      class="font-medium text-xl text-dark-blue-200 text-bold font-sans flex-1 box-title"
    >
      {{ title }}
    </p>
    <p class="font-bold text-primary text-xl font-sans box-value">
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
  background-color: #f44336;
}
.NewConfirmed {
  background-color: #503caa;
}
</style>
