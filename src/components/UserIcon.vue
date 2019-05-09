<template>
  <div :class="classes">
    <div v-if="user.uid">
      <img :class="classes + '__img'" :src="user.photo" alt="">
      <p :class="classes + '__name'">{{ user.name }}</p>
    </div>
    <div v-if="!user.uid">
      <p :class="classes + '__name'">ユーザーなし</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
    },
    user: Object,
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
  @mixin img($width: 50px, $height: 50px) {
    float: left;
    margin-right: 10px;
    border-radius: 50%;
    width: $width;
    height: $height;
  }
  @mixin name($pr: 10px, $lh: 50px) {
    color: $sub-color;
    float: left;
    padding-right: $pr;
    line-height: $lh;
  }
  .user-icon {
    display: inline-block;
    margin: auto 0;
    &__img {
      @include img();
    }
    &__name {
      @include name();
    }
  }
  .user-icon-mini {
    display: inline-block;
    margin: auto 0;
    &__img {
      @include img(40px, 40px);
    }
    &__name {
      @include name(8px, 40px);
    }
  }
</style>
