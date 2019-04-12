<template>
  <div class="index-page">
    <div class="index-page__head">
      <input type="text" class="index-page__head__search" placeholder="検索">
      <router-link to="/task/new"><Btn class="index-page__head__btn">Add+</Btn></router-link>
    </div>
    <card-list></card-list>
  </div>
</template>

<script>
import Btn from '@/components/Btn.vue';
import CardList from '@/components/CardList.vue';

export default {
  components: {
    Btn,
    CardList,
  },
};
</script>

<style lang="scss" scoped>
  .index-page {
    position: absolute;
    top: 72px;
    right: 0px;
    left: 0px;
    background-color: #faf161;
    &__head {
      margin: 30px auto;
      width: 70%;
      display: flex;
      justify-content: space-between;
      &__search {
        font-size: 16px;
        height: 43px;
        width: 250px;
        outline: none;
        border: none;
        border-bottom: 2px solid #153940;
        background-color: rgba(0,0,0,0);
      }
      &__btn {
        font-size: 18px;
        width: 90px;
      }
    }
  }
</style>
