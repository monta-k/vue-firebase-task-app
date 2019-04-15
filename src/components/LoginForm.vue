<template>
  <div class="login-form">
    <h1 class="login-form__title">Task App</h1>
    <btn class="login-form__btn" type="button" @click="login">Googleアカウントでログイン</btn>
  </div>
</template>

<script>
import Btn from '@/components/Btn.vue';
import Auth from '../modules/auth';

export default {
  name: 'login-form',
  components: {
    Btn,
  },
  methods: {
    login() {
      Auth.googleLogin(this);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  padding: 0px 300px 100px 300px;
  border: solid white;
  border-radius: 20px;
  &__title {
    margin-top: 40px;
    font-size: 100px;
    margin-bottom: 50px;
    color: #153940;
  }
  &__btn {
    background-color: #DB4437;
  }
}
</style>
