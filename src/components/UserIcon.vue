<template>
  <div class="user-icon">
    <img class="user-icon__img" src="https://lh4.googleusercontent.com/-nL_E6ZrOPQ4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdZMXI3lopDg6DmSvJLSEeUfXoQ9w/mo/photo.jpg" alt="アイコン">
    <p class="user-icon__name">ログインユーザー</p>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  .user-icon {
    display: inline-block;
    &__img {
      float: left;
      margin-right: 10px;
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    &__name {
      color: #3e3d34;
      float: left;
      border-right: 1px solid #3e3d34;
      padding-right: 10px;
    }
  }
</style>
