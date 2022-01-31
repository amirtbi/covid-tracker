<template>
  <main class="bg-gray flex flex-row w-full">
    <section class="countries_reports m-4 max-w-4xl">
      <base-card class="w-full">
        <article>
          <div
            class="search-box p-4 flex flex-col content-center justify-center"
          >
            <form class="w-full form-control">
              <div class="country-box flex flex-col">
                <label
                  class="text-purple font-bold font-Roboto mb-2 pl-2"
                  for="country"
                  >Countries Reports</label
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
      <base-card class="w-100 rounded-2xl">
        <div class="flex flex-col items-start justify-center">
          <header
            class="header p-6 pb-0 w-full flex flex-row items-center justify-center"
          >
            <h2 class="text-xl text-primary font-Roboto font-medium">
              Coronavirus Cases
            </h2>
            <p class="font-medium self-end text-darkblue ml-2 font-Roboto">
              -Worldwide
            </p>
          </header>
          <div class="header_totalConfirmed m-0 p-6">
            <h4 class="font-medium tracking-wide m-0 font-Roboto text-darkblue">
              Total Confirmed Cases
            </h4>
            <p class="text-2xl mt-2 text-primary font-bold font-Roboto">
              {{ totalConfirmed.toLocaleString() }}
            </p>
          </div>
          <!-- Progress bar statics -->
          <div
            class="flex w-100 flex-row items-center justify-start p-4 indicator_container"
          >
            <div
              :style="{ width: newConfirmedWidth + '%' }"
              class="bg-primary mr-1 h-1 p-2 indicator indicator_active--case"
            ></div>
            <div
              :style="{ width: totalDeathsWidth + '%' }"
              class="bg-Cyan h-1 mr-1 p-2 indicator indicator_death--case"
            ></div>
            <div
              :style="{ width: newDeathsWidth + '%' }"
              class="bg-red h-1 p-2 indicator indicator_newDeaths--case"
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
        { title: "NewConfirmed", amount: "" },
        { title: "TotalDeaths", amount: "" },
        { title: "NewDeaths", amount: "" },
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

    setCategories() {
      // NewConfirmed
      const index = this.categories.findIndex((cat) => {
        return cat.title === "NewConfirmed";
      });
      this.categories[index].amount = this.$store.getters.newConfirmed;
      
      // TotalDeaths
       const indexTD = this.categories.findIndex((cat) => {
        return cat.title === "TotalDeaths";
      });
      this.categories[indexTD].amount = this.$store.getters.totalDeaths;
      // newDeaths
       const indexND = this.categories.findIndex((cat) => {
        return cat.title === "NewDeaths";
      });
      this.categories[indexND].amount = this.$store.getters.newDeaths;
    },
  },
  created() {
    this.loadSummary();
    this.setCategories();
  },
  mounted(){
    this.setCategories();
  }
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
  /* overflow-y: scroll; */
  max-height: 400px;
}
/* div.indicator_container {
  width: 100%;
} */
div.indicator {
  border: none;
  border-radius: 5px;
}
/* div.indicator_active--case {
  width: 20%;
}
div.indicator_death--case {
  width: 40%;
}
div.indicator_recovered--case {
  width: 40%;
} */
</style>
