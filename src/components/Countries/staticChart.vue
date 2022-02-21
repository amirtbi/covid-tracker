<script>
// Import chart js
import { Line } from "vue-chart-3";
export default {
  extends: Line,
  props: ["chartData", "options"],
  data() {
    return {};
  },
  mounted() {
    const dates = this.chartData.map((d) => d.date).reverse();
    const totals = this.chartData.map((d) => d.total).reverse();
    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: "Posiitons",
            data: totals,
          },
        ],
      },
      this.options
    );
  },
  methods: {},
  created() {
    console.log(this.chartData);
  },
};
</script>
<style scoped>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
