import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: Object,
    chartOptions: Object,
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  },
}
