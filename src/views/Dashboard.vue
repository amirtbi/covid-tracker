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
      class="content-container rounded-lg flex flex-row mx-10 w-full shadow-lg bg-white-color p-10 items-center"
    >
      <!-- list of countries --->
      <div class="w-1/2 flex flex-col items-start">
        <!-- search box-->
        <search-item
          @search="countryHandler"
          @submitForm="displayCountry"
        ></search-item>
        <div class="country-container mt-5">
          <ul
            class="countryLists flex flex-col w-full px-4 py-5 overflow-y-scroll"
          >
            <country-item
              v-for="item in filteredCountries"
              :key="item.ID"
              :country-name="item.Country"
              :death-amount="item.TotalDeaths"
            ></country-item>
          </ul>
        </div>
      </div>
      <!-- Chart -->
      <chart-item :chosen-country="submitedText"></chart-item>
    </div>
  </section>
</template>

<script>
//import lineChart from "../components/Countries/staticChart.vue";
import axios from "axios";
import { mapGetters } from "vuex";

import InfoItem from "../components/Countries/InfoItems.vue";
import CountryItem from "../components/Countries/country.vue";
import SearchItem from "../components/UI/baseSearch.vue";
import ChartItem from "../components/Countries/chartItem.vue";
export default {
  components: {
    InfoItem,
    CountryItem,
    SearchItem,
    ChartItem,
  },
  data() {
    return {
      filtered: [],
      searchedCountry: "",
      submitedText: "",
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
      let defaultChoice = {
        country: "Switzerland",
        selection: "Monthly",
      };
      await this.$store.dispatch("addCountryData", defaultChoice);
    },
    countryHandler(enteredCountry) {
      this.filtered.length = 0;
      this.searchedCountry = enteredCountry;
      //   this.submitedText = enteredCountry;
      const countries = this.$store.getters.summary.Countries;
      const index = countries.findIndex((cr) => cr.Country === enteredCountry);
      this.filtered.push(countries[index]);
    },
    displayCountry(enteredCountry) {
      console.log("Entered value", enteredCountry);
      const countries = this.$store.getters.summary.Countries;
      const index = countries.findIndex((cr) => cr.Country === enteredCountry);
      this.searchedCountry = enteredCountry;
      this.submitedText = enteredCountry;
      this.filtered.push(countries[index]);
    },
    async loadSecondaryData() {
      const Base_url =
        "https://api.covid19api.com/country/south-africa/status/confirmed";
      const responseData = await axios.get(Base_url);
    },
  },
  created() {
    this.loadSummary();
    this.loadcountryData();
    this.loadSecondaryData();
  },
  updated() {
    console.log("selected country", this.searchedCountry);
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

/* country list */
div.country-container {
  width: 60%;
}
ul.countryLists {
  height: 600px;
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
input::placeholder {
  transition: all 0.5s ease-in;
}
input:focus::placeholder {
  opacity: 0;
}
canvas {
  height: 200px;
}
</style>
