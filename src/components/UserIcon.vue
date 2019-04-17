<template>
  <div :class="classes" v-if="user" v-cloak>
    <img :class="classes + '__img'" :src="user.photo" alt="">
    <p :class="classes + '__name'">{{ user.name }}</p>
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
    padding-right: 10px;
    line-height: 50px;
  }
  [v-cloak] {
    display: none;
  }
  .user-icon {
    display: inline-block;
    &__img {
      @include img();
    }
    &__name {
      @include name();
    }
  }
  .user-icon-mini {
    display: inline-block;
    &__img {
      @include img(40px, 40px);
    }
    &__name {
      @include name(8px, 40px);
    }
  }
</style>
