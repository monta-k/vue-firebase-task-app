<template>
  <div class="card-list">
    <div class="card-list__section">
      <h1 class="card-list__section__title"><font-awesome-icon icon="list-ul" /> To Do</h1>
      <draggable element="div" class="card-list__section__cards" :options="{ group: 'tasks' }" v-model="toDoTask">
        <router-link v-for="task in toDoTask" :key="task.id" v-show="showTask(task)" class="card-list__section__cards__single" :to="{ name: 'ShowPage', params: { task: task.id } }">
          <div class="card-list__section__cards__single__flag" :class="{'high': task.priority == 20, 'middle': task.priority == 10}"></div>
          <p class="card-list__section__cards__single__title">{{ task.name }}</p>
          <user-icon class="card-list__section__cards__single__user" type="mini" :user="task.assigned_user"></user-icon>
        </router-link>
      </draggable>
    </div>
    <div class="card-list__section">
      <h1 class="card-list__section__title"><font-awesome-icon icon="list-ul" /> In Progress</h1>
      <draggable element="div" class="card-list__section__cards" :options="{ group: 'tasks' }" v-model="inProgressTask">
        <router-link v-for="task in inProgressTask" :key="task.id" v-show="showTask(task)" class="card-list__section__cards__single" :to="{ name: 'ShowPage', params: { task: task.id } }">
          <div class="card-list__section__cards__single__flag" :class="{'high': task.priority == 20, 'middle': task.priority == 10}"></div>
          <p class="card-list__section__cards__single__title">{{ task.name }}</p>
          <user-icon class="card-list__section__cards__single__user" type="mini" :user="task.assigned_user"></user-icon>
        </router-link>
      </draggable>
    </div>
    <div class="card-list__section">
      <h1 class="card-list__section__title"><font-awesome-icon icon="list-ul" /> Done</h1>
      <draggable element="div" class="card-list__section__cards" :options="{ group: 'tasks' }" v-model="doneTask">
        <router-link v-for="task in doneTask" :key="task.id" v-show="showTask(task)" class="card-list__section__cards__single" :to="{ name: 'ShowPage', params: { task: task.id } }">
          <div class="card-list__section__cards__single__flag" :class="{'high': task.priority == 20, 'middle': task.priority == 10}"></div>
          <p class="card-list__section__cards__single__title">{{ task.name }}</p>
          <user-icon class="card-list__section__cards__single__user" type="mini" :user="task.assigned_user"></user-icon>
        </router-link>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import UserIcon from '@/components/UserIcon.vue'
import Task from '../modules/task'

export default {
  props: {
    allTasks: Array,
    searchWord: String,
    narrowing: String,
  },
  computed: {
    toDoTask: {
      get() {
        return this.taskOrder(this.allTasks.filter(task => task.progress === '0'))
      },
      set(value) {
        this.dragUpdate(value, '0')
      },
    },
    inProgressTask: {
      get() {
        return this.taskOrder(this.allTasks.filter(task => task.progress === '10'))
      },
      set(value) {
        this.dragUpdate(value, '10')
      },
    },
    doneTask: {
      get() {
        return this.taskOrder(this.allTasks.filter(task => task.progress === '20'))
      },
      set(value) {
        this.dragUpdate(value, '20')
      },
    },
    searchWordRegex() {
      return new RegExp(this.searchWord)
    },
  },
  methods: {
    dragUpdate(tasks, progress) {
      tasks.forEach((updatetask, index) => {
        Object.assign((this.allTasks.find(task => task.id === updatetask.id)), { order_id: index, progress })
      })
      Task.OrderUpdate(tasks, progress)
    },
    narrowedTask(task) {
      return (this.narrowing === '' || this.narrowing === task.priority)
    },
    searchedTask(task) {
      return (this.searchWordRegex.test(task.name) || this.searchWordRegex.test(task.assigned_user.name) || this.searchWordRegex.test(task.registered_user.name))
    },
    showTask(task) {
      return this.narrowedTask(task) && this.searchedTask(task)
    },
    taskOrder(tasks) {
      return tasks.sort((a, b) => {
        if (a.order_id < b.order_id) return -1
        if (a.order_id > b.order_id) return 1
        if (a.created_at < b.created_at) return -1
        if (a.created_at > b.created_at) return 1
        return 0
      })
    },
  },
  components: {
    UserIcon,
    draggable,
  },
}
</script>

<style lang="scss" scoped>
  .card-list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 15px;
    margin: 0 252px;
    &__section {
      grid-column: 4 span;
      &__title {
        width: 70%;
        text-align: left;
        font-weight: bold;
        font-size: 32px;
      }
      &__cards {
        margin: 20px 0px;
        height: 620px;
        overflow: auto;
        &__single {
          position: relative;
          margin-bottom: 20px;
          background-color: white;
          border-radius: 10px;
          display: block;
          color: $sub-color;
          text-align: left;
          &__flag {
            position: absolute;
            float: left;
            width: 10px;
            height: 100%;
            margin-right: 5px;
            border-radius: 10px 0 0 10px;
          }
          .high {
            background-color: #951b24;
            }
          .middle {
            background-color: #f18520;
          }
          &__title {
            margin: 0;
            font-size: 18px;
            line-height: 1.5rem;
            padding: 10px 0 0 15px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          &__user {
            padding-left: 15px;
          }
        }
      }
    }
  }
</style>
