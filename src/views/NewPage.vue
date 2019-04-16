<template>
  <div class="new-page">
    <h2 class="new-page__title">New Task</h2>
    <task-form :allUsers="allUsers"></task-form>
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue';

export default {
  props: {
    allUsers: Object,
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
  .new-page {
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
