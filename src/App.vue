<template>
  <div id="app">
    <Header v-if="$route.name !== 'LoginPage'" :user="user"></Header>
    <loading v-if="loading"></loading>
    <router-view @loaded="loaded"></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import firebase from 'firebase';

export default {
  data() {
    return {
      loading: true,
      user: {
        uid: '',
        name: '',
        photo: '',
      },
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user.uid = user.uid;
        this.user.name = user.displayName;
        this.user.photo = user.photoURL;
      } else {
        this.user.uid = '';
        this.user.name = '';
        this.user.photo = '';
      }
    });
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
  color: $sub-color;
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: $main-color;
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
