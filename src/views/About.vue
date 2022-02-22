<template>
  <section>
    <div class="small">
      <line-chart :chartData="testData" :options="options"></line-chart>
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
            fill: true,
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
            backgroundColor: "transparent",
            hoverBorderColor: "red",
            pointHoverBackground: "purple",
            hoverOffset: 4,
            borderDash: [8, 5],
          },
        ],
      };
    },
    options() {
      return {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              drawnOnChartArea: true,
              borderColor: "black",
            },
            ticks: {
              maxTicksLimit: 20,
            },
          },
          y: {
            grid: {
              borderColor: "black",

              // color: "purple",
            },

            ticks: {
              beginAtZero: false,
              color: "purple",

              maxTicksLimit: 10,
              stepSize: Math.ceil(2000 / 5),
              max: 3600,
            },
          },
        },
        elements: {
          Line: {
            tension: 0.4,
            backgroundColor: "yellow",
            borderColor: "red",
            borderWidth: 10,
          },
          point: {
            radius: 1,
            pointStyle: "cicle",
            hitRadius: 100,
            hoverRadius: 5,
            hoverBorderWidth: 3,
            borderColor: "yellow",
          },
        },
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
