<template>
  <div class="graph-page">
    <router-view :allTasks="allTasks"></router-view>
  </div>
</template>

<script>

export default {
  props: {
    allTasks: Array,
  },
}
</script>

<style lang="scss">
  .graph-page {
    position: absolute;
    top: 72px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
</style>
