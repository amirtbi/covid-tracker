<template>
  <main class="bg-gray">
    <section class="countries_reports">
      <base-card>
        <article>
          <div
            class="search-box p-4 flex flex-col content-center justify-center"
          >
            <form class="w-full form-control">
              <div class="country-box flex flex-col">
                <label
                  class="text-purple font-bold font-sans mb-2 pl-2"
                  for="country"
                  >Countries Reports</label
                >
                <input
                  class="appearance-none bg-gray text-black font-sans rounded-xl py-3 px-4 hover:outline-0"
                  type="text"
                  placeholder="Search country..."
                  id="country"
                />
              </div>
            </form>
          </div>
          <div class="country-wrapper flex w-full">
            <ul
              class="w-full
               flex flex-col justify-center 
                align-items-center sm:mt-8 pl-2 pr-2"
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
  </main>
</template>

<script>
import CountryItem from "../components/Countries/CountryItem.vue";
export default {
  components: {
    CountryItem,
  },
  data() {
    return {
      selectedCountry: "",
    };
  },

  computed: {
    Summaries() {
      return this.$store.getters.summary;
    },
    countries() {
      return this.$store.getters.countries;
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
      console.log("countries:", this.$store.getters.countries);
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
  overflow-y: scroll;
  max-height: 400px;
}
</style>
