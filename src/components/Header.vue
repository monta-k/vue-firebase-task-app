<template>
  <header class="navbar">
    <router-link to="/"><h2 class="navbar__title">Task App</h2></router-link>
    <div class="navbar__right">
      <UserIcon></UserIcon>
      <Btn class="navbar__right__btn" type="text" @click="logout">ログアウト</Btn>
    </div>
  </header>
</template>

<script>
import Btn from '@/components/Btn.vue';
import UserIcon from '@/components/UserIcon.vue';
import Auth from '../modules/auth';

export default {
  components: {
    Btn,
    UserIcon,
  },
  methods: {
    logout() {
      Auth.logout(this);
    },
  },
};
</script>

<style lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;
    background-color: #faf161;
    width: 100%;
    height: 72px;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    &__title {
      color: #3e3d34;
    }
    &__right {
      margin-right: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      &__btn {
        border-left: 1px solid #3e3d34 !important;
      }
    }
  }
</style>
