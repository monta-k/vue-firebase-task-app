<template>
  <div class="show-page" v-if="showTask">
    <card-detail :task="showTask"></card-detail>
    <div class="show-page__foot">
      <router-link :to="{ name: 'EditPage', params: { task: showTask.id } }">
        <app-btn class="show-page__foot__edit"><font-awesome-icon icon="edit" /> 編集</app-btn>
      </router-link>
      <app-btn class="show-page__foot__delete" @click="deleteTask" :variation="'danger'"><font-awesome-icon icon="trash" /> 削除</app-btn>
    </div>
    <comment-area :task="showTask" :loginUser="loginUser"></comment-area>
  </div>
</template>

<script>
import AppBtn from '@/components/AppBtn.vue';
import CardDetail from '@/components/CardDetail.vue';
import CommentArea from '@/components/CommentArea.vue';
import Task from '../modules/task';

export default {
  props: {
    allTasks: Array,
    loginUser: Object,
  },
  computed: {
    showTask() {
      return this.allTasks.find(task => task.id === this.$route.params.task);
    },
  },
  components: {
    AppBtn,
    CardDetail,
    CommentArea,
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
      margin: 30px 0;
      &__edit {
        font-size: 22px;
        width: 100px;
        margin: 0 70px;
      }
      &__delete {
        font-size: 22px;
        width: 100px;
        margin: 0 70px;
      }
    }
  }
</style>
