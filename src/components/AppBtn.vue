<template>
  <button :class="this.variation" style="cursor:pointer" @click="handleClick"><slot /></button>
</template>

<script>
export default {
  props: {
    variation: {
      type: String,
      default: 'normal',
    },
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
  @mixin btn() {
    padding: 10px;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    color: white;
  }
  .normal {
    @include btn();
    background-color: $sub-color;
  }
  .danger {
    @include btn();
    background-color: #DB4437;
  }
  .text {
    border: none;
    outline: none;
    background-color: rgba(0,0,0,0);
    font-size: 16px;
    color: $sub-color;
    padding: 0px 7px 2px 7px;
  }
</style>
