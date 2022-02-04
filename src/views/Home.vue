<template>
  <main class="bg-gray flex flex-row w-full">
    <!-- List of Countries -->
    <section class="countries_reports m-4 max-w-4xl">
      <base-card class="rounded-2xl w-2">
        <article class="bg-primary">
          <div
            class="search-box p-4 flex flex-col content-center justify-center"
          >
            <form class="w-full form-control">
              <div class="country-box flex flex-col">
                <label
                  class="text-primary-200 font-bold font-Roboto mb-4 pl-2"
                  for="country"
                  >Cases by Countries</label
                >
                <!-- Search box -->
                <base-search @search="countryHandler"></base-search>
              </div>
            </form>
          </div>
          <div class="country-wrapper overflow-scroll flex w-100">
            <!-- countries box -->
            <ul
              class="w-100 flex flex-col justify-start items-center mt-0 pl-2 pr-2"
            >
              <country-item
                v-for="item in filteredCountries"
                :title="item.Country"
                :total-death="item.TotalDeaths"
                :key="item.ID"
              ></country-item>
            </ul>
          </div>
        </article>
      </base-card>
    </section>
    <!-- Global Statics -->
    <section class="ml-6 max-w-5xl mt-4">
      <base-card class="bg-primary w-20 rounded-2xl">
        <div class="flex flex-col items-start justify-center w-100">
          <header
            class="header p-6 pb-0 w-100 flex flex-row items-center justify-start"
          >
            <h2 class="text-xl text-primary-200 font-Roboto font-medium">
              Coronavirus Cases
            </h2>
            <p class="font-medium self-end text-primary-200 ml-2 font-Roboto">
              -Worldwide
            </p>
          </header>
          <div class="header_totalConfirmed m-0 p-6 w-100">
            <h4
              class="font-medium tracking-wide m-0 font-Roboto text-primary-200"
            >
              Total Confirmed Cases
            </h4>
            <p class="text-2xl mt-2 text-primary-200 font-bold font-Roboto">
              {{ totalConfirmed.toLocaleString() }}
            </p>
          </div>
          <!-- Progress bar statics -->
          <div
            class="flex w-100 flex-row items-center justify-start p-4 indicator_container"
          >
            <div
              :style="{ width: newConfirmedWidth + '%' }"
              class="bg-tomato mr-1 h-1 p-2 indicator indicator_active--case"
            ></div>
            <div
              :style="{ width: totalDeathsWidth + '%' }"
              class="bg-Cyan h-1 mr-1 p-2 indicator indicator_death--case"
            ></div>
            <div
              :style="{ width: newDeathsWidth + '%' }"
              class="bg-yellow h-1 p-2 indicator indicator_newDeaths--case"
            ></div>
          </div>
          <!--Labels -->
          <div class="w-100 flex flex-col mb-6 items-start justify-center">
            <global-static
              v-for="category in categories"
              :key="category.title"
              :title="category.title"
              :amount="category.amount"
            ></global-static>
          </div>
        </div>
      </base-card>
    </section>
    <!-- Country Statics -->
    <section class="ml-6 max-w-5xl mt-4">
      <country-static
        :country-filtered="filtered.length === 0 ? '' : filtered[0]"
      ></country-static>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import CountryItem from "../components/Countries/CountryItem.vue";
import GlobalStatic from "../components/Countries/globalStaticItem.vue";
import CountryStatic from "../components/Countries/countryStatic.vue";
export default {
  components: {
    CountryItem,
    GlobalStatic,
    CountryStatic,
  },
  data() {
    return {
      filtered: [],
      searchedCountry: "",
      categories: [
        { title: "NewConfirmed" },
        { title: "TotalDeaths" },
        { title: "NewDeaths" },
      ],
    };
  },

  computed: {
    ...mapGetters(["summary", "countries", "totalConfirmed", "newConfirmed"]),

    newConfirmedWidth() {
      return (
        (100 * this.$store.getters.newConfirmed) / this.$store.getters.total
      );
    },
    totalDeathsWidth() {
      return (
        (100 * this.$store.getters.totalDeaths) / this.$store.getters.total
      );
    },
    newDeathsWidth() {
      return (100 * this.$store.getters.newDeaths) / this.$store.getters.total;
    },
    filteredCountries() {
      this.filtered.length = 0;
      if (this.searchedCountry === "") {
        return this.$store.getters.summary.Countries;

        // An Array
      } else {
        const countries = this.$store.getters.summary.Countries;
        const index = countries.findIndex((cr) => {
          return cr.Country === this.searchedCountry;
        });
        if (index > -1) {
          this.filtered.push(this.$store.getters.summary.Countries[index]);
          console.log(this.filtered[0]);
          return this.filtered;
        } else {
          console.log("Value not found!");
          return this.$store.getters.summary.Countries;
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
    countryHandler(enteredCountry) {
      console.log("Entered Country:", enteredCountry);
      this.searchedCountry = enteredCountry;
    },
  },
  created() {
    this.loadSummary();
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
  width: 10px;
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
</style>
