<template>
  <div class="login-form">
    <h1 class="login-form__title">Task App</h1>
    <btn class="login-form__btn">Googleアカウントでログイン</btn>
  </div>
</template>

<script>
import Btn from '@/components/Btn.vue';

export default {
  name: 'login-form',
  components: {
    Btn,
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  padding: 50px 300px 100px 300px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  &__title {
    margin-bottom: 50px;
  }
  &__btn {
    background-color: #DB4437;
  }
}
</style>
