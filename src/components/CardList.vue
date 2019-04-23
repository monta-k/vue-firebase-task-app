<template>
  <div class="card-list">
    <div class="card-list__section">
      <h1 class="card-list__section__title"><font-awesome-icon icon="list-ul" /> To Do</h1>
      <div class="card-list__section__cards">
        <router-link v-for="task in toDoTask" :key="task.id" class="card-list__section__cards__single" :to="{ name: 'ShowPage', params: { task: task.id } }">
          <p class="card-list__section__cards__single__title">{{ task.name }}</p>
          <user-icon class="card-list__section__cards__single__user" type="mini" :user="task.assigned_user"></user-icon>
        </router-link>
      </div>
    </div>
    <div class="card-list__section">
      <h1 class="card-list__section__title"><font-awesome-icon icon="list-ul" /> In Progress</h1>
      <div class="card-list__section__cards">
        <router-link v-for="task in inProgressTask" :key="task.id" class="card-list__section__cards__single" :to="{ name: 'ShowPage', params: { task: task.id } }">
          <p class="card-list__section__cards__single__title">{{ task.name }}</p>
          <user-icon class="card-list__section__cards__single__user" type="mini" :user="task.assigned_user"></user-icon>
        </router-link>
      </div>
    </div>
    <div class="card-list__section">
      <h1 class="card-list__section__title"><font-awesome-icon icon="list-ul" /> Done</h1>
      <div class="card-list__section__cards">
        <router-link v-for="task in doneTask" :key="task.id" class="card-list__section__cards__single" :to="{ name: 'ShowPage', params: { task: task.id } }">
          <p class="card-list__section__cards__single__title">{{ task.name }}</p>
          <user-icon class="card-list__section__cards__single__user" type="mini" :user="task.assigned_user"></user-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserIcon from '@/components/UserIcon.vue';

export default {
  props: {
    allTasks: Array,
    searchWord: String,
  },
  computed: {
    toDoTask() {
      return this.searchedTasks.filter(task => task.progress === '0');
    },
    inProgressTask() {
      return this.searchedTasks.filter(task => task.progress === '10');
    },
    doneTask() {
      return this.searchedTasks.filter(task => task.progress === '20');
    },
    searchedTasks() {
      return this.allTasks.filter(task => ((task.name.indexOf(this.searchWord) !== -1)
        || (task.assigned_user.name.indexOf(this.searchWord) !== -1)
        || (task.registered_user.name.indexOf(this.searchWord) !== -1)));
    },
  },
  components: {
    UserIcon,
  },
};
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
        height: 660px;
        overflow: auto;
        &__single {
          margin-bottom: 20px;
          padding: 10px;
          background-color: white;
          border-radius: 10px;
          display: block;
          color: $sub-color;
          text-align: left;
          &__title {
            margin: 0;
            font-size: 22px;
            padding: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &__user {
          }
        }
      }
    }
  }
</style>
