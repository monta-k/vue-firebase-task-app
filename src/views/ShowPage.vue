<template>
  <div class="show-page">
    <card-detail :task="showTask"></card-detail>
    <div class="show-page__foot">
      <router-link to="/task/edit"><Btn class="show-page__foot__edit">編集</Btn></router-link>
      <Btn class="show-page__foot__delete">削除</Btn>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/Btn.vue';
import CardDetail from '@/components/CardDetail.vue';

export default {
  props: {
    allTasks: Array,
  },
  computed: {
    showTask() {
      return this.allTasks.find((task) => {
        return (task.id === this.$route.params.task);
      });
    },
  },
  components: {
    Btn,
    CardDetail,
  },
  mounted() {
    this.$emit('loaded');
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
