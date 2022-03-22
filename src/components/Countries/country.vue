<template>
  <li
    @click="clickHandler"
    class="cursor-pointer text-ellipsis text-sm font-bold mb-4 flex flex-row items-center justify-start"
  >
    <p class="text-blue-color mr-4 text-ellipsis whitespace-nowrap truncate">
      {{ countryName }}
    </p>
    <h3 class="text-sm text-gray-color">
      {{ deathAmount.toLocaleString() }}
    </h3>
  </li>
</template>

<script>
export default {
  props: ["countryName", "deathAmount"],
  methods: {
    async clickHandler() {
      try {
        const userSelection = {
          selection: "Monthly",
          country: this.countryName,
        };
        await this.$store.dispatch("addCountryData", userSelection);
        this.$store.commit("setChosenCountry", this.countryName);
      } catch (error) {
        console.log("error", error.message);
      }
    },
  },
};
</script>
