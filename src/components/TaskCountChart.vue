<template>
  <div class="task-count-chart">
    <app-loading v-if="loading" class="task-count-chart__loading"></app-loading>
    <line-chart v-if="!loading" class="task-count-chart__chart" :chartData="chartData" :chartOptions="chartOptions"></line-chart>
  </div>
</template>

<script>
import AppLoading from '@/components/AppLoading.vue'
import LineChart from '../modules/lineChart'
import TaskCount from '../modules/taskCount'

export default {
  data() {
    return {
      taskCountData: {
        toDo: [],
        inProgress: [],
        done: [],
      },
      taskCountLabel: [],
      loading: false,
      chartOptions: {
        responsive: true,
        legend: {
          display: true,
        },
        scales: {
          yAxes: [{
            stacked: true,
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'タスク数',
              fontSize: 18,
            },
            ticks: {
              min: 0,
              max: 20,
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
          }],
        },
      },
    }
  },
  computed: {
    chartData() {
      return {
        type: 'line',
        labels: this.taskCountLabel,
        datasets: [
          {
            label: 'toDo',
            fill: true,
            backgroundColor: '#8fa8c8',
            pointBackgroundColor: '#75539e',
            borderColor: '#75539e',
            pointHighlightStroke: '#75539e',
            borderCapStyle: 'butt',
            data: this.taskCountData.toDo,
          },
          {
            label: 'inProgress',
            fill: true,
            backgroundColor: '#92bed2',
            pointBackgroundColor: '#3282bf',
            borderColor: '#3282bf',
            pointHighlightStroke: '#3282bf',
            data: this.taskCountData.inProgress,
          },
          {
            label: 'done',
            fill: true,
            backgroundColor: '#e0eadf',
            pointBackgroundColor: '#6fccdd',
            borderColor: '#6fccdd',
            pointHighlightStroke: '#6fccdd',
            data: this.taskCountData.done,
          },
        ],
      }
    },
  },
  async mounted() {
    this.loading = true
    const data = await TaskCount.allTaskCount()
    data.forEach((d) => {
      this.taskCountLabel.push(d.id)
      this.taskCountData.toDo.push(d.todo_count)
      this.taskCountData.inProgress.push(d.inprogress_count)
      this.taskCountData.done.push(d.done_count)
    })
    this.loading = false
  },
  components: {
    LineChart,
    AppLoading,
  },
}
</script>

<style lang="scss">
  .task-count-chart {
    &__loading {
      margin: 200px auto;
    }
    &__chart {
      width: 45%;
      margin: 10px auto;
    }
  }
</style>
