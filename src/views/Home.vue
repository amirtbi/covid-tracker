<template>
  <main class="bg-gray flex flex-row w-full">
    <section class="countries_reports m-4 max-w-4xl">
      <base-card class="rounded-2xl w-2">
        <article class=" bg-primary">
          <div
            class="search-box p-4 flex flex-col  content-center justify-center"
          >
            <form class="w-full form-control">
              <div class="country-box flex flex-col">
                <label
                  class="text-primary-200 font-bold font-Roboto mb-4 pl-2"
                  for="country"
                  >Cases by Countries</label
                >
                <!-- Search box -->
                <base-search></base-search>
              </div>
            </form>
          </div>
          <div class="country-wrapper overflow-scroll flex w-full">
            <!-- countries box -->
            <ul
              class="w-full flex flex-col justify-center align-items-center sm:mt-8 pl-2 pr-2"
            >
              <country-item
                v-for="item in Summaries.Countries"
                :title="item.Country"
                :total-death="item.TotalDeaths"
                :key="item.ID"
              ></country-item>
            </ul>
          </div>
        </article>
      </base-card>
    </section>
    <!-- section Statics -->
    <section class="ml-6 max-w-5xl mt-4">
      <base-card class="bg-primary w-100 rounded-2xl">
        <div class="flex flex-col items-start justify-center">
          <header
            class="header p-6 pb-0 w-full flex flex-row items-center justify-center"
          >
            <h2 class="text-xl text-primary-200 font-Roboto font-medium">
              Coronavirus Cases
            </h2>
            <p class="font-medium self-end text-primary-200 ml-2 font-Roboto">
              -Worldwide
            </p>
          </header>
          <div class="header_totalConfirmed m-0 p-6">
            <h4 class="font-medium tracking-wide m-0 font-Roboto text-primary-200">
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
          <div class="w-100 flex flex-col items-start justify-center">
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
  </main>
</template>

<script>
import CountryItem from "../components/Countries/CountryItem.vue";
import GlobalStatic from "../components/Countries/globalStaticItem.vue";

export default {
  components: {
    CountryItem,
    GlobalStatic,
  },
  data() {
    return {
      categories: [
        { title: "NewConfirmed" },
        { title: "TotalDeaths" },
        { title: "NewDeaths" },
      ],
    };
  },

  computed: {
    Summaries() {
      return this.$store.getters.summary;
    },
    countries() {
      return this.$store.getters.countries;
    },
    totalConfirmed() {
      return this.$store.getters.totalConfirmed;
    },
    newConfirmed() {
      return this.$store.getters.newConfirmed;
    },
    totalRecovered() {
      return this.$store.getters.totalRecovered;
    },
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
  },
  methods: {
    // Catching selected country
    setCountry(event) {
      const country = event.target.value;
      this.selectedCountry = country;
    },
    async loadSummary() {
      try {
        await this.$store.dispatch("showGlobalInfo");
        await this.$store.dispatch("addCountries");
      } catch (error) {
        alert(error.message);
      }
      console.log("summary:", this.$store.getters.summary);
      console.log("Total", this.$store.getters.total);
      console.log("newConfirmed", this.$store.getters.newConfirmed);
      console.log("totalDeaths", this.$store.getters.totalDeaths);
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
  scroll-behavior:smooth;
  max-height: 400px;
  overflow-x:auto;
  border-radius: 10px;
}
.country-wrapper::-webkit-scrollbar{
  width: 10px;
}
.country-wrapper::-webkit-scrollbar-thumb{
 
   background-color: #c1c1cc;
   border-radius: 10px;
}
.country-wrapper::-webkit-scrollbar-track{
  background-color:#9cacbf;
}
div.indicator {
  border: none;
  border-radius: 5px;
}

</style>
