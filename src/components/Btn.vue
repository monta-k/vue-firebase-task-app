<template>
  <button class="btn" type="button" style="cursor:pointer" @click="handleClick"><slot /></button>
</template>

<script>
export default {
  name: 'btn',
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn {
    padding: 10px;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    color: white;
  }
</style>
