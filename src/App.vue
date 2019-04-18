<template>
  <div id="app">
    <Header v-if="$route.name !== 'LoginPage'" :loginUser="loginUser"></Header>
    <loading v-if="loading"></loading>
    <router-view @loaded="loaded" :allUsers="allUsers" :allTasks="allTasks" :loginUser="loginUser"></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import User from './modules/user';
import Task from './modules/task';
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
      allTasks: [],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginUser.uid = user.uid;
        this.loginUser.name = user.displayName;
        this.loginUser.photo = user.photoURL;
        this.allUsers = User.allUsers();
        this.allTasks = Task.allTasks();
      } else {
        this.loginUser.uid = '';
        this.loginUser.name = '';
        this.loginUser.photo = '';
      }
    });
  },
  watch: {
    $route(to) {
      if (to.path === '/') {
        this.allTasks = Task.allTasks();
      }
    },
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
