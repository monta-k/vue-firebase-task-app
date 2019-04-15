<template>
  <div class="card-detail">
    <div class="card-detail__head">
      <p class="card-detail__head__title">タスク名</p>
      <user-icon class="card-detail__head__user"></user-icon>
    </div>
    <div class="card-detail__detail">
      詳細/////////////////////////////////////////////
      <br>
      ////////////////////////////////////////////////
      <br>
      ////////////////////////////////////////////////
    </div>
    <div class="card-detail__foot">
      <p class="card-detail__foot__priority">優先度: 中</p>
      <user-icon class="card-detail__foot__user"></user-icon>
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

<style lang="scss">
  .card-detail {
    margin: 100px 20% 50px 20%;
    padding: 10px;
    border-radius: 20px;
    background-color: white;
    &__head {
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid #153940;
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
      border-top: 1px solid #153940;
      padding: 10px 0;
      &__priority {
        margin-right: 20px;
      }
    }
  }
</style>