<template>
  <div class="login-page">
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
