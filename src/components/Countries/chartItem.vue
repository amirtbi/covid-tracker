<template>
  <div class="w-full relative flex flex-row">
    <div
      class="countryname-container absolute flex flex-row items-center justify-center"
    >
      <span class="text-xl text-blue-color font-bold"
        >{{ this.chosenCountry === "" ? "Switzerland" : this.chosenCountry }}
      </span>
    </div>
    <line-chart id="canvas" :chartData="testData" :options="options">
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
        ],
      };
    },
    options() {
      return {
        maintainAspectRatio: false,
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
  },

  methods: {
    async loadData() {
      try {
        let country =
          this.chosenCountry == "" ? "Switzerland" : this.chosenCountry;
        let userSelection = {
          selection: this.customFilter,
          country: country,
        };
        await this.$store.dispatch("addCountryData", userSelection);
      } catch (error) {
        console.log(error.message);
      }
    },
    async setCustomFilter(filterSelected) {
      console.log("selected", filterSelected);
      this.customFilter = filterSelected;
      await this.$store.dispatch(
        "addCountryData",

        this.customFilter
      );
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
</style>
