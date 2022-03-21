<template>
  <li
    class="cursor-pointer transition-all hover:shadow-none relative w-full rounded-md flex mr-4 flex-col items-center bg-white-color shadow-lg p-10"
  >
    <h2 class="text-blue-color font-bold">{{ title }}</h2>
    <p :class="Classes" class="mt-2 text-xl font-bold text-danger-color">
      {{ amount.toLocaleString() }}
    </p>
    <small class="absolute bottom-1 text-muted-color mb-0"
      >{{ aspectRationValue }}%</small
    >
  </li>
</template>

<script>
export default {
  props: ["totalConfirmed", "title"],

  computed: {
    Classes() {
      if (this.title === "NewConfirmed") {
        return "text-danger-color";
      } else if (this.title === "TotalConfirmed") {
        return "text-info-color";
      } else {
        return "text-pink-color";
      }
    },
    aspectRationValue() {
      let totalConfirmed = this.$store.getters.totalConfirmed;
      let totalDeaths = this.$store.getters.totalDeaths;
      if (this.title === "NewConfirmed") {
        let newConfirmed = this.$store.getters.newConfirmed;
        return ((newConfirmed / totalConfirmed) * 100).toFixed(2);
      } else if (this.title === "TotalConfirmed") {
        return "0.01";
      } else {
        let newDeaths = this.$store.getters.newDeaths;
        return ((newDeaths / totalDeaths) * 100).toFixed(2);
      }
    },
    amount() {
      if (this.title === "NewConfirmed") {
        return this.$store.getters.newConfirmed;
      } else if (this.title === "TotalConfirmed") {
        return this.$store.getters.totalConfirmed;
      } else {
        return this.$store.getters.newDeaths;
      }
    },
  },
};
</script>

<style></style>
