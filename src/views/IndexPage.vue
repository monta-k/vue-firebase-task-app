<template>
  <div class="index-page">
    <div class="index-page__head">
      <input type="text" class="index-page__head__search" placeholder="検索" v-model="searchWord">
      <router-link to="/task/new">
        <app-btn class="index-page__head__btn">Add <font-awesome-icon icon="plus" /></app-btn>
      </router-link>
    </div>
    <div class="index-page__select">
      <select name="priority" class="index-page__select__form" v-model="narrowing">
        <option value="" selected>All</option>
        <option value="0">優先度: 低</option>
        <option value="10">優先度: 中</option>
        <option value="20">優先度: 高</option>
      </select>
    </div>
    <card-list :allTasks="allTasks" :searchWord="searchWord" :narrowing="narrowing"></card-list>
  </div>
</template>

<script>
import AppBtn from '@/components/AppBtn.vue'
import CardList from '@/components/CardList.vue'

export default {
  data() {
    return {
      searchWord: '',
      narrowing: '',
    }
  },
  props: {
    allTasks: Array,
  },
  components: {
    AppBtn,
    CardList,
  },
}
</script>

<style lang="scss" scoped>
  .index-page {
    position: absolute;
    top: 72px;
    right: 0px;
    left: 0px;
    &__head {
      margin: 30px auto 0px auto;
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
        font-family: FontAwesome;
        font-style: normal;
        font-weight: normal;
        text-decoration: inherit;
      }
      &__btn {
        font-size: 18px;
        width: 90px;
      }
    }
    &__select {
        margin: 10px auto 30px auto;
        width: 70%;
        text-align: left;
      &__form {
        font-size: 16px;
        height: 43px;
        width: 200px;
        outline: none;
        border: none;
        border-bottom: 2px solid $sub-color;
        background-color: rgba(0,0,0,0);
        font-family: FontAwesome;
        font-style: normal;
        font-weight: normal;
        text-decoration: inherit;
      }
    }
  }
</style>
