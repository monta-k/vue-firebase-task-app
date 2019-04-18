<template>
  <div class="card-detail" v-if="task">
    <div class="card-detail__head">
      <p class="card-detail__head__title">{{ task.name }}</p>
      <user-icon class="card-detail__head__user" type="mini" :user="task.registered_user"></user-icon>
    </div>
    <div class="card-detail__detail"><pre>{{ task.detail }}</pre></div>
    <div class="card-detail__foot">
      <p class="card-detail__foot__priority">優先度: {{ priority }}</p>
      <user-icon class="card-detail__foot__user" type="mini" :user="task.assigned_user"></user-icon>
    </div>
  </div>
</template>

<script>
import UserIcon from '@/components/UserIcon.vue';

export default {
  props: {
    task: Object,
  },
  computed: {
    priority() {
      let priority = '';
      switch (this.task.priority) {
        case '0':
          priority = '低';
          break;
        case '10':
          priority = '中';
          break;
        case '20':
          priority = '高';
          break;
        default:
      }
      return priority;
    },
  },
  components: {
    UserIcon,
  },
};
</script>

<style lang="scss">
  .card-detail {
    width: 70%;
    margin: 100px auto 30px auto !important;
    padding: 20px !important;
    border-radius: 20px;
    background-color: white;
    &__head {
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid $sub-color;
      padding: 10px 0;
      &__title {
        font-size: 22px;
        display: inline-block;
        margin: 0;
        padding-top: 10px;
      }
    }
    &__detail {
      text-align: left;
      margin: 20px 0;
    }
    &__foot {
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid $sub-color;
      padding: 10px 0;
      &__priority {
        margin-right: 20px;
        line-height: 50px;
      }
    }
  }
</style>
