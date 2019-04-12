<template>
  <div :class="classes">
    <img :class="classes + '__img'" src="https://lh4.googleusercontent.com/-nL_E6ZrOPQ4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdZMXI3lopDg6DmSvJLSEeUfXoQ9w/mo/photo.jpg" alt="アイコン">
    <p :class="classes + '__name'">ログインユーザー</p>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    classes() {
      const cls = this.type === 'mini' ? 'user-icon-mini' : 'user-icon';
      return cls;
    },
  },
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
      padding-right: 10px;
    }
  }
  .user-icon-mini {
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    &__img {
      float: left;
      margin-right: 10px;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
    &__name {
      color: #3e3d34;
      float: left;
      padding-right: 8px;
    }
  }
</style>
