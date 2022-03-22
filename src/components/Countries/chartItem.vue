<template>
  <div class="w-full relative flex flex-col">
    <div class="chart-header">
      <!-- Country name label --->
      <div
        class="countryname-container absolute flex flex-row items-center justify-center"
      >
        <span class="text-xl text-blue-color font-bold">{{ Country }} </span>
      </div>
      <!-- Custom filter buttons --->
      <div
        class="absolute right-0 actions-container flex flex-row items-center justify-center"
      >
        <button
          @click="setCustomFilter('Monthly', '$event')"
          id="monthly"
          class="bg-gray-color-500 transition-all hover:bg-info-color hover:text-white-color cursor-pointer px-2 py-1 mr-2 btn-filter"
        >
          Monthly
        </button>
        <button
          @click="setCustomFilter('Daily', '$event')"
          id="daily"
          class="bg-gray-color-500 transition-all hover:bg-info-color hover:text-white-color cursor-pointer mr-2 btn-filter px-3 py-1"
        >
          Daily
        </button>
      </div>
    </div>

    <line-chart
      class="mt-2"
      id="canvas"
      :chartData="testData"
      :options="options"
    >
    </line-chart>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { LineChart } from "vue-chart-3";
import { defineComponent } from "vue";
Chart.register(...registerables);
export default defineComponent({
  props: ["chosenCountry"],
  name: "App",
  components: {
    LineChart,
  },
  data() {
    return {
      customFilter: "Monthly",
      country: "Switzerland",
    };
  },

  computed: {
    testData() {
      return {
        labels: this.xLabel,

        datasets: [
          {
            data: this.yLabel,
            label: `Total Confirmed`,
            borderColor: "black",
            fill: true,
            borderColor: "#9577FF",
            borderWidth: 4,
            backgroundColor: "transparent",
            hoverBorderColor: "red",
            pointHoverBackground: "purple",
          },
          {
            data: this.yLabel,
            label: `Total Deaths`,
            borderColor: "black",
            fill: true,
            borderColor: "#9577FF",
            borderWidth: 4,
            backgroundColor: "transparent",
            hoverBorderColor: "red",
            pointHoverBackground: "purple",
          },
        ],
      };
    },
    options() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            // Customize the legend
            labels: {
              fontFamily: "Poppins",
              usePointStyle: true,
              boxWidth: 10,

              font: {
                size: 20,
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawnOnChartArea: true,
              borderColor: "white",
            },
            ticks: {
              // maxTicksLimit: 15,
              color: "#9577FF",
              fontStyle: "bold",
              font: {
                size: 14,
              },
            },
          },
          y: {
            grid: {
              display: false,
              borderColor: "white",
              offest: true,
            },

            ticks: {
              beginAtZero: false,
              color: "#9577FF",
              maxTicksLimit: 12,
              fontStyle: "bold",
              stepSize: Math.ceil(2000 / 5),
              max: Math.max(...this.yLabel),
              font: {
                size: 14,
              },
            },
          },
        },
        elements: {
          Line: {
            tension: 0.1,

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
      return this.$store.getters.countryStatic.map((data) => {
        return data.tick;
      });
    },
    yLabel() {
      return this.$store.getters.countryStatic.map((data) => {
        return data.total;
      });
    },
    chartYearTitle() {
      const dates = this.$store.getters.countryStatic.map((data) => {
        return data.Year;
      });
      return dates[0];
    },
    Country() {
      return this.$store.getters.selectedCountry;
    },
  },

  methods: {
    async loadData() {
      try {
        // Default value for choseCountry ==> Switzerland
        this.country =
          this.chosenCountry == "" ? "Switzerland" : this.chosenCountry;
        let userSelection = {
          selection: this.customFilter,
          country: this.country,
        };
        await this.$store.dispatch("addCountryData", userSelection);
      } catch (error) {
        console.log(error.message);
      }
    },
    async setCustomFilter(userSelected) {
      const userEntry = {
        selection: userSelected,
        country: this.country,
      };
      try {
        await this.$store.dispatch("addCountryData", userEntry);
      } catch (error) {
        console.log(error.message);
      }
      this.clickedButton = userSelected;
    },
  },
  created() {
    this.loadData();
  },
});
</script>

<style scoped>
#canvas {
  width: 100%;
  height: 400px;
}
.countryname-container {
  transition: all 0.5s ease;
  top: -14px;
}
.actions-container {
  top: -20px;
}
button.active {
  background-color: purple;
  color: white;
}
button.deActive {
  background-color: darkgray;
  color: white;
}
</style>
