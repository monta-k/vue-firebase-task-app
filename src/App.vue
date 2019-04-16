<template>
  <div id="app">
    <Header v-if="$route.name !== 'LoginPage'" :loginUser="loginUser"></Header>
    <loading v-if="loading"></loading>
    <router-view @loaded="loaded" :allUsers="allUsers"></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import User from './modules/user';
import firebase from 'firebase';

export default {
  data() {
    return {
      loading: true,
      loginUser: {
        uid: '',
        name: '',
        photo: '',
      },
      allUsers: [],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginUser.uid = user.uid;
        this.loginUser.name = user.displayName;
        this.loginUser.photo = user.photoURL;
      } else {
        this.loginUser.uid = '';
        this.loginUser.name = '';
        this.loginUser.photo = '';
      }
    });
    User.allUsers(this);
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
body {
  background-color: $main-color;
}
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
