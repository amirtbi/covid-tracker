<template>
  <section>
    <div class="small">
      <line-chart :chartData="testData"></line-chart>
    </div>
    <div>
      <ul>
        <li v-for="data in covidData" :key="data.date">
          <p>date:{{ data.date }}</p>
          <p>Total:{{ data.total }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { LineChart } from "vue-chart-3";
import { ref, defineComponent, computed } from "vue";
import { useStore } from "vuex";
import store from "../store";
//
Chart.register(...registerables);
// import lineChart from "../components/Countries/staticChart.vue";
export default defineComponent({
  name: "App",
  components: {
    LineChart,
  },

  data() {
    return {
      data: [1, 2, 3, 4],
    };
  },
  computed: {
    testData() {
      return {
        // //labels: ["Paris", "Tehran", "Los Angeles", "Shiraz"],
        labels: this.xLabel,

        datasets: [
          {
            data: this.yLabel,

            label: "my custom chart",
            borderColor: "black",
            // tension: 0.1,
            // backgroundColor: [
            //   "#0079AF",
            //   "#0079AF",
            //   "#123E6B",
            //   "#97B0C4",
            //   "#A5C8ED",
            // ],
          },
        ],
      };
    },
    covidData() {
      return this.$store.getters.countryStatic;
    },
    xLabel() {
      return store.getters.countryStatic.map((data) => {
        return data.date;
      });
    },
    yLabel() {
      return store.getters.countryStatic.map((data) => {
        return data.total;
      });
    },
  },
  methods: {
    async loadData() {
      try {
        await this.$store.dispatch("addCountryData");
        console.log(this.xLabel);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  created() {
    this.loadData();
  },
});
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
