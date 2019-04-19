<template>
  <div class="show-page" v-if="showTask">
    <card-detail :task="showTask"></card-detail>
    <div class="show-page__foot">
      <router-link :to="{ name: 'EditPage', params: { task: showTask.id } }"><app-btn class="show-page__foot__edit">編集</app-btn></router-link>
      <app-btn class="show-page__foot__delete" @click="deleteTask">削除</app-btn>
    </div>
  </div>
</template>

<script>
import AppBtn from '@/components/AppBtn.vue';
import CardDetail from '@/components/CardDetail.vue';
import Task from '../modules/task';

export default {
  props: {
    allTasks: Array,
  },
  computed: {
    showTask() {
      return this.allTasks.find(task => task.id === this.$route.params.task);
    },
  },
  components: {
    AppBtn,
    CardDetail,
  },
  methods: {
    async deleteTask() {
      if (window.confirm('タスクを削除してもよろしいですか?')) {
        await Task.deleteTask(this.showTask.id);
        this.$router.replace('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .show-page {
    position: absolute;
    top: 72px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    &__foot {
      &__edit {
        font-size: 22px;
        width: 100px;
        margin: 0 70px;
      }
      &__delete {
        font-size: 22px;
        width: 100px;
        background-color: #DB4437;
        margin: 0 70px;
      }
    }
  }
</style>
