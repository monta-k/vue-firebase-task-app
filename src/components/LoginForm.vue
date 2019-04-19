<template>
  <div class="login-form">
    <h1 class="login-form__title">Task App</h1>
    <app-btn class="login-form__btn" type="button" @click="login">Googleアカウントでログイン</app-btn>
  </div>
</template>

<script>
import AppBtn from '@/components/AppBtn.vue';
import Auth from '../modules/auth';

export default {
  name: 'login-form',
  components: {
    AppBtn,
  },
  methods: {
    async login() {
      await Auth.googleLogin();
      this.$router.replace({ name: 'IndexPage' });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  padding: 100px 300px;
  border: solid white;
  border-radius: 20px;
  &__title {
    margin-bottom: 50px;
    font-size: 110px;
    color: $sub-color;
  }
  &__btn {
    background-color: #DB4437;
  }
}
</style>
