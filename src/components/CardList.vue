<template>
  <div class="card-list">
    <div class="card-list__section">
      <h1 class="card-list__section__title">To Do</h1>
      <div class="card-list__section__cards">
        <router-link class="card-list__section__cards__single" to="/task/show">
          <p class="card-list__section__cards__single__title">タスク名</p>
          <user-icon class="card-list__section__cards__single__user" type="mini"></user-icon>
        </router-link>
        <router-link class="card-list__section__cards__single" to="/task/show">
          <p class="card-list__section__cards__single__title">タスク名</p>
          <user-icon class="card-list__section__cards__single__user" type="mini"></user-icon>
        </router-link>
        <router-link class="card-list__section__cards__single" to="/task/show">
          <p class="card-list__section__cards__single__title">タスク名</p>
          <user-icon class="card-list__section__cards__single__user" type="mini"></user-icon>
        </router-link>
      </div>
    </div>
    <div class="card-list__section">
      <h1 class="card-list__section__title">In Progress</h1>
      <div class="card-list__section__cards">
        <router-link class="card-list__section__cards__single" to="/task/show">
          <p class="card-list__section__cards__single__title">タスク名</p>
          <user-icon class="card-list__section__cards__single__user" type="mini"></user-icon>
        </router-link>
        <router-link class="card-list__section__cards__single" to="/task/show">
          <p class="card-list__section__cards__single__title">タスク名</p>
          <user-icon class="card-list__section__cards__single__user" type="mini"></user-icon>
        </router-link>
        <router-link class="card-list__section__cards__single" to="/task/show">
          <p class="card-list__section__cards__single__title">タスク名</p>
          <user-icon class="card-list__section__cards__single__user" type="mini"></user-icon>
        </router-link>
      </div>
    </div>
    <div class="card-list__section">
      <h1 class="card-list__section__title">Done</h1>
      <div class="card-list__section__cards">
        <router-link class="card-list__section__cards__single" to="/task/show">
          <p class="card-list__section__cards__single__title">タスク名</p>
          <user-icon class="card-list__section__cards__single__user" type="mini"></user-icon>
        </router-link>
        <router-link class="card-list__section__cards__single" to="/task/show">
          <p class="card-list__section__cards__single__title">タスク名</p>
          <user-icon class="card-list__section__cards__single__user" type="mini"></user-icon>
        </router-link>
        <router-link class="card-list__section__cards__single" to="/task/show">
          <p class="card-list__section__cards__single__title">タスク名</p>
          <user-icon class="card-list__section__cards__single__user" type="mini"></user-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserIcon from '@/components/UserIcon.vue';

export default {
  components: {
    UserIcon,
  },
};
</script>

<style lang="scss" scoped>
  .card-list {
    &__section {
      &__title {
        width: 70%;
        margin: 0 auto;
        text-align: left;
        font-weight: bold;
        font-size: 32px;
      }
      &__cards {
        margin: 20px 0px;
        &__single {
          margin: 10px auto;
          padding: 10px;
          background-color: white;
          width: 60%;
          border-radius: 10px;
          display: block;
          display: flex;
          justify-content: space-between;
          &__title {
            margin: 0;
            font-size: 22px;
            padding: 10px;
          }
          &__user {
            text-align: left;
          }
        }
      }
    }
  }
</style>
