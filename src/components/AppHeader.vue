<template>
  <header class="navbar">
    <router-link to="/"><h2 class="navbar__title">Task App</h2></router-link>
    <div class="navbar__right">
      <UserIcon class="navbar__right__icon" :user="loginUser" v-if="loginUser.uid"></UserIcon>
      <router-link class="navbar__right__link" to="/users" v-if="loginUser.admin">ユーザー管理</router-link>
      <div @mouseover="openMenu" @mouseout="closeMenu" class="navbar__right__dropdown">
        <a class="navbar__right__dropdown__title" style="text-decoration:none;" href="#">利用状況 <font-awesome-icon icon="angle-down" /></a>
        <ul class="navbar__right__dropdown__list" v-show="menuOpen">
          <li class="navbar__right__dropdown__list__item">
            <router-link class="navbar__right__dropdown__list__item__link" to="/graph/addedTask">日別タスク追加数</router-link>
          </li>
          <li class="navbar__right__dropdown__list__item">
            <router-link class="navbar__right__dropdown__list__item__link" to="/graph/countTask">日別タスク分類</router-link>
          </li>
        </ul>
      </div>
      <app-btn class="navbar__right__btn" variation="text" @click="logout">ログアウト <font-awesome-icon icon="sign-out-alt" /></app-btn>
    </div>
  </header>
</template>

<script>
import AppBtn from '@/components/AppBtn.vue'
import UserIcon from '@/components/UserIcon.vue'

export default {
  data() {
    return {
      menuOpen: false,
    }
  },
  props: {
    loginUser: Object,
  },
  components: {
    AppBtn,
    UserIcon,
  },
  methods: {
    logout() {
      this.$emit('logout')
    },
    openMenu() {
      this.menuOpen = true
    },
    closeMenu() {
      this.menuOpen = false
    },
  },
}
</script>

<style lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;
    width: 70%;
    padding: 0 15% !important;
    height: 72px;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: $main-color;
    &__title {
      color: $sub-color;
      font-size: 32px;
      font-weight: bold;
      line-height: 72px;
    }
    &__right {
      display: flex;
      justify-content: center;
      align-items: center;
      &__link {
        text-decoration: none;
        color: $sub-color;
        padding: 10px;
      }
      &__dropdown {
        padding: 10px 0;
        margin-bottom: 1px;
        &:hover {
          background-color: #efe65b;
        }
        &__title {
          color: $sub-color;
        }
        &__list {
          position: absolute;
          top: 43px;
          background-color: #efe65b;
          &__item {
            text-align: left;
            margin: 10px;
            &__link {
              color: $sub-color;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
</style>
