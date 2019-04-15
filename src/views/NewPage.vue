<template>
  <div class="new-page">
    <h2 class="new-page__title">New Task</h2>
    <task-form></task-form>
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue';

export default {
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
    background-color: #faf161;
    &__title {
      font-size: 56px;
    }
  }
</style>
