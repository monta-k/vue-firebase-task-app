<template>
  <div id="app">
    <Header v-if="$route.name !== 'LoginPage'"></Header>
    <loading v-if="loading"></loading>
    <router-view @loaded="loaded"></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';

export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    Header,
    Loading,
  },
  methods: {
    loaded() {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: #faf161;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
  }
  textarea {
    resize: none;
  }
}
</style>
