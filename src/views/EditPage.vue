<template>
  <div class="edit-page">
    <h2 class="edit-page__title">Edit Task</h2>
    <task-form :allUsers="allUsers" :loginUser="loginUser" :task="showTask"></task-form>
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue';

export default {
  props: {
    allUsers: Array,
    loginUser: Object,
    allTasks: Array,
  },
  computed: {
    showTask() {
      return this.allTasks.find(task => task.id === this.$route.params.task);
    },
  },
  components: {
    TaskForm,
  },
  mounted() {
    this.$emit('loaded');
  },
};
</script>

<style lang="scss" scoped>
  .edit-page {
    position: absolute;
    top: 72px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    &__title {
      font-size: 56px;
      font-weight: bold;
      margin-top: 100px;
    }
  }
</style>
