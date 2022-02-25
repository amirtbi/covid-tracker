<template>
  <section>
    <div class="small">
      <header class="header-container">
        <div>
          <h1>Covid-19 statics</h1>
          <p>year:{{ chartYearTitle }}</p>
        </div>
        <div class="actions">
          <button>Day</button>
          <button>Year</button>
          <button>Month</button>
        </div>
      </header>
      <line-chart
        id="canvas"
        :chartData="testData"
        :options="options"
      ></line-chart>
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
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },

  computed: {
    testData() {
      return {
        labels: this.xLabel,

        datasets: [
          {
            data: this.yLabel,
            label: `Switzerland`,
            borderColor: "black",
            fill: true,
            borderColor: "rgba(137, 128, 255, 0.8)",
            borderWidth: 2,
            backgroundColor: "rgba(245, 155, 255, 0.8)",
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
              fontFamily: "Comic Sans MS",
              boxWidth: 60,
              boxHeight: 20,

              fony: {
                size: 20,
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              drawnOnChartArea: true,
              borderColor: "black",
            },
            ticks: {
              // maxTicksLimit: 15,
              color: "purple",
              fontStyle: "bold",
              font: {
                size: 14,
              },
            },
          },
          y: {
            grid: {
              borderColor: "black",
              offest: true,
            },

            ticks: {
              beginAtZero: false,
              color: "purple",
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
        return data.Month;
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
        await this.$store.dispatch("addCountryData");
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  margin: 150px auto;
  position: relative;
  box-shadow: 7px 10px 18px -3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  margin-bottom: 1rem;
}
.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header-container h1 {
  font-family: sans-serif;
  font-weight: bold;
  font-size: 2rem;
}
button {
  padding: 0.2rem 1rem;
  background-color: rgb(223, 217, 217);
  margin-right: 0.2rem;
  font-size: 0.5rem;
}
button:hover {
  background-color: gray;
}
#canvas {
  width: 100%;
}
</style>
