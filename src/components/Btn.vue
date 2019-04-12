<template>
  <button :class="classes" style="cursor:pointer" @click="handleClick"><slot /></button>
</template>

<script>
export default {
  name: 'btn',
  props: {
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    classes() {
      const cls = this.type === 'text' ? this.type : 'btn';
      return cls;
    },
  },
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
    background-color: #153940;
  }
  .text {
    border: none;
    outline: none;
    background-color: rgba(0,0,0,0);
    font-size: 16px;
    color: #3e3d34;
  }
</style>
