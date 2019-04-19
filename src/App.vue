<template>
  <div id="app">
    <app-header v-if="$route.name !== 'LoginPage'" :loginUser="loginUser"></app-header>
    <app-loading v-if="loading"></app-loading>
    <router-view @loaded="loaded" :allUsers="allUsers" :allTasks="allTasks" :loginUser="loginUser"></router-view>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppLoading from '@/components/AppLoading.vue';
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
        this.getAllUsers();
        this.getAllTasks();
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
        this.getAllTasks();
      }
    },
  },
  components: {
    AppHeader,
    AppLoading,
  },
  methods: {
    loaded() {
      this.loading = false;
    },
    async getAllUsers() {
      this.allUsers = await User.allUsers();
    },
    async getAllTasks() {
      this.allTasks = await Task.allTasks();
    }
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
