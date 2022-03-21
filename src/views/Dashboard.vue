<template>
  <!---- Title ------>
  <div class="w-full mx-10 mt-10">
    <h1 class="text-xl font-poppins">
      <span class="text-blue-color font-bold mr-4">Covid-19</span
      ><span class="text-black-color">Global Trend</span>
    </h1>
  </div>
  <!-- static info card -->
  <section class="flex w-full items-center mt-10">
    <div class="w-full mx-10">
      <ul class="flex flex-row">
        <info-item v-for="item in categories" :title="item.title"></info-item>
      </ul>
    </div>
  </section>
  <!-- Country Static --->
  <section class="w-full flex items-center mt-5">
    <div
      class="content-container flex flex-row mx-10 w-full shadow-lg bg-white-color p-10"
    >
      <!-- list of countries --->
      <div class="w-1/2 flex flex-col items-start">
        <!-- search box-->
        <div class="w-full mb-4 bg-gray-500">
          <input
            class="w-full rounded-full px-6 py-2 placeholder-black-color"
            type="search"
            placeholder="Search Country"
          />
        </div>
        <div class="w-1/2">
          <ul
            class="countryLists flex flex-col w-full px-4 py-5 overflow-y-scroll"
          >
            <li
              v-for="item in filteredCountries"
              :key="item.ID"
              class="text-ellipsis text-sm font-bold mb-4 flex flex-row items-center justify-start"
            >
              <p
                class="text-blue-color mr-4 text-ellipsis whitespace-nowrap truncate"
              >
                {{ item.Country }}
              </p>
              <h3 class="text-sm text-gray-color">
                {{ item.TotalDeaths.toLocaleString() }}
              </h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
//import lineChart from "../components/Countries/staticChart.vue";

import { mapGetters } from "vuex";

import InfoItem from "../components/Countries/InfoItems.vue";
export default {
  components: {
    InfoItem,
    //lineChart,
  },
  data() {
    return {
      filtered: [],
      searchedCountry: "",
      categories: [
        { title: "NewConfirmed" },
        { title: "TotalConfirmed" },
        { title: "NewDeaths" },
      ],
    };
  },

  computed: {
    ...mapGetters(["summary", "countries", "totalConfirmed", "newConfirmed"]),

    countryData() {
      return this.$store.getters.countryStatic;
    },
    filteredCountries() {
      this.filtered.length = 0;
      if (this.searchedCountry === "") {
        return this.$store.getters.summary.Countries;

        // An Array
      } else {
        const countries = this.$store.getters.summary.Countries;

        // Live search country
        const foundCountries = countries.filter((cr) =>
          cr.Country.includes(this.searchedCountry)
        );
        if (!foundCountries) {
          return this.$store.getters.summary.Countries;
        } else {
          return foundCountries;
        }
      }
    },
  },
  methods: {
    async loadSummary() {
      try {
        await this.$store.dispatch("showGlobalInfo");
        await this.$store.dispatch("addCountries");
      } catch (error) {
        alert(error.message);
      }
    },
    async loadcountryData() {
      await this.$store.dispatch("addCountryData");
    },
    countryHandler(enteredCountry) {
      this.filtered.length = 0;
      this.searchedCountry = enteredCountry;
      const countries = this.$store.getters.summary.Countries;
      const index = countries.findIndex((cr) => cr.Country === enteredCountry);
      this.filtered.push(countries[index]);
    },
    displayCountry(enteredCountry) {
      const countries = this.$store.getters.summary.Countries;
      const index = countries.findIndex((cr) => cr.Country === enteredCountry);
      this.filtered.push(countries[index]);
    },
  },
  created() {
    this.loadSummary();
    this.loadcountryData();
  },
};
</script>

<style scoped>
input:focus {
  border: none;
  outline: none;
}
main {
  min-height: calc(100% - 60px);
}

div.country-wrapper {
  scroll-behavior: smooth;
  min-height: 400px;
  max-height: 400px;
  overflow-x: auto;
  border-radius: 10px;
}
.country-wrapper::-webkit-scrollbar {
  width: 5px;
}
.country-wrapper::-webkit-scrollbar-thumb {
  background-color: #c1c1cc;
  border-radius: 10px;
}
.country-wrapper::-webkit-scrollbar-track {
  background-color: #9cacbf;
}
div.indicator {
  border: none;
  border-radius: 5px;
}
/* country list */
div.content-container {
  width: 1200px;
}
ul.countryLists {
  height: 500px;
}
ul.countryLists::-webkit-scrollbar {
  width: 5px;
}
ul.countryLists::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 15px;
}
ul.countryLists::-webkit-scrollbar-track {
  background-color: rgb(230, 229, 229);
}
</style>
