<template>
  <header class="navbar">
    <router-link to="/"><h2 class="navbar__title">Task App</h2></router-link>
    <div class="navbar__right">
      <UserIcon :user="loginUser" v-if="loginUser.uid"></UserIcon>
      <app-btn class="navbar__right__btn" type="text" @click="logout">ログアウト <font-awesome-icon icon="sign-out-alt" /></app-btn>
    </div>
  </header>
</template>

<script>
import AppBtn from '@/components/AppBtn.vue';
import UserIcon from '@/components/UserIcon.vue';
import Auth from '../modules/auth';

export default {
  props: {
    loginUser: Object,
  },
  components: {
    AppBtn,
    UserIcon,
  },
  methods: {
    async logout() {
      await Auth.logout();
      this.$router.replace({ name: 'LoginPage' });
    },
  },
};
</script>

<style lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: 72px;
    padding: 0 20px;
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
      &__btn {
        border-left: 1px solid $sub-color !important;
      }
    }
  }
</style>
