<template>
  <div class="added-task-chart">
    <div class="added-task-chart__title">
      <font-awesome-icon icon="angle-left" style="cursor:pointer" @click="prevMonth" />
      {{ yearMonth }}
      <font-awesome-icon icon="angle-right" style="cursor:pointer" @click="nextMonth" />
    </div>
    <bar-chart class="added-task-chart__chart" :chartData="chartData" :chartOptions="chartOptions"></bar-chart>
  </div>
</template>

<script>
import moment from 'moment'
import BarChart from '../modules/barChart'

export default {
  data() {
    return {
      showTime: moment(),
      chartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'タスク追加数',
              fontSize: 18,
            },
            ticks: {
              min: 0,
              suggestedMax: 5,
              fontSize: 18,
              stepSize: 1,
            },
          }],
          xAxes: [{
            display: true,
            barPercentage: 0.5,
            scaleLabel: {
              display: true,
              labelString: '日',
              fontSize: 18,
            },
            ticks: {
              fontSize: 18,
              autoSkip: false,
              autoSkipPadding: 1,
            },
          }],
        },
      },
    }
  },
  props: {
    allTasks: Array,
  },
  computed: {
    yearMonth() {
      return this.showTime.format('YYYY-MM')
    },
    daysInMonth() {
      return this.showTime.daysInMonth()
    },
    chartData() {
      return {
        labels: [...Array(this.daysInMonth).keys()].map(i => i + 1),
        datasets: [
          {
            type: 'bar',
            label: 'タスク追加数',
            fill: false,
            data: this.addedTasks(),
            backgroundColor: '#153940',
          },
        ],
      }
    },
  },
  methods: {
    nextMonth() {
      this.showTime = this.showTime.clone().add(1, 'months')
    },
    prevMonth() {
      this.showTime = this.showTime.clone().subtract(1, 'months')
    },
    addedTasks() {
      const data = []
      for (let i = 1; i < this.daysInMonth + 1; i++) {
        const today = moment(`${this.yearMonth}-${i}`).valueOf()
        const tomorrow = moment(`${this.yearMonth}-${i + 1}`).valueOf()
        let count = 0
        this.allTasks.forEach((task) => {
          if (today <= task.created_at && task.created_at < tomorrow) {
            count += 1
          }
        })
        data.push(count)
      }
      return data
    },
  },
  components: {
    BarChart,
  },
}
</script>

<style lang="scss">
  .added-task-chart {
    &__title {
      font-size: 32px;
      display: inline-block;
      font-weight: bold;
    }
    &__chart {
      width: 45%;
      margin: 10px auto;
    }
  }
</style>
