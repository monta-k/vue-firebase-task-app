<template>
  <header class="navbar">
    <router-link to="/"><h2 class="navbar__title">Task App</h2></router-link>
    <div class="navbar__right">
      <UserIcon class="navbar__right__icon" :user="loginUser" v-if="loginUser.uid"></UserIcon>
      <router-link class="navbar__right__link" to="/users" v-if="loginUser.admin">ユーザー管理</router-link>
      <app-btn class="navbar__right__btn" type="text" @click="logout">ログアウト <font-awesome-icon icon="sign-out-alt" /></app-btn>
    </div>
  </header>
</template>

<script>
import AppBtn from '@/components/AppBtn.vue';
import UserIcon from '@/components/UserIcon.vue';

export default {
  props: {
    loginUser: Object,
  },
  components: {
    AppBtn,
    UserIcon,
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
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
        padding-left: 10px;
      }
    }
  }
</style>
