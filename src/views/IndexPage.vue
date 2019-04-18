<template>
  <div class="index-page">
    <div class="index-page__head">
      <input type="text" class="index-page__head__search" placeholder="検索" v-model="searchWord">
      <router-link to="/task/new"><Btn class="index-page__head__btn">Add+</Btn></router-link>
    </div>
    <card-list :allTasks="allTasks" :searchWord="searchWord"></card-list>
  </div>
</template>

<script>
import Btn from '@/components/Btn.vue';
import CardList from '@/components/CardList.vue';

export default {
  data() {
    return {
      searchWord: '',
    };
  },
  props: {
    allTasks: Array,
  },
  components: {
    Btn,
    CardList,
  },
  mounted() {
    this.$emit('loaded');
  },
};
</script>

<style lang="scss" scoped>
  .index-page {
    position: absolute;
    top: 72px;
    right: 0px;
    left: 0px;
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
        border-bottom: 2px solid $sub-color;
        background-color: rgba(0,0,0,0);
      }
      &__btn {
        font-size: 18px;
        width: 90px;
      }
    }
  }
</style>
