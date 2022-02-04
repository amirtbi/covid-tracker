<template>
  <base-card class="bg-primary w-30 rounded-2xl">
    <div class="country-static">
      <header
        class="country-static__header p-4 pb-0 w-100 flex flex-row items-center justify-start"
      >
        <h4
          class="country-static__title text-xl text-primary-200 font-Roboto font-medium"
        >
          Coronavirus Cases<span class="country text-sm ml-2"
            >-{{ title }}</span
          >
        </h4>
      </header>
      <article>
        <static-item
          :total-confirmed="totalConfirmed"
          :total-deaths="totalDeaths"
          :new-deaths="newDeaths"
        ></static-item>
      </article>
    </div>
  </base-card>
</template>

<script>
import StaticItem from "./staticItem.vue";
export default {
  props: ["countryFiltered"],
  components: {
    StaticItem,
  },
  data() {
    return {};
  },
  computed: {
    title() {
      if (this.countryFiltered != "") {
        return this.countryFiltered.Country;
      } else {
        return "WorldWide";
      }
    },

    totalConfirmed() {
      if (this.countryFiltered != "") {
        return this.countryFiltered.TotalConfirmed;
      } else {
        return this.$store.getters.totalConfirmed;
      }
    },

    totalDeaths() {
      if (this.countryFiltered != "") {
        return this.countryFiltered.TotalDeaths;
      } else {
        return this.$store.getters.totalDeaths;
      }
    },
    newDeaths() {
      if (this.countryFiltered != "") {
        return this.countryFiltered.NewDeaths;
      } else {
        return this.$store.getters.newDeaths;
      }
    },
  },
  methods: {},
  created() {
    console.log("Country filtered", this.countryFiltered);
  },
};
</script>
