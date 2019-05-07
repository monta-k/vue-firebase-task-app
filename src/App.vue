<template>
  <div id="app">
    <app-header v-if="$route.name !== 'LoginPage'" :loginUser="loginUser" @logout="logout"></app-header>
    <app-loading v-if="loading"></app-loading>
    <h2 v-if="!loading && !available">利用が承認されるまでお待ちください</h2>
    <router-view v-if="!loading && available" :allUsers="allUsers" :allTasks="allTasks" :loginUser="loginUser"></router-view>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppLoading from '@/components/AppLoading.vue';
import Auth from './modules/auth';
import User from './modules/user';
import Task from './modules/task';
import firebase from 'firebase';

export default {
  data() {
    return {
      loading: true,
      loginUser: {},
      allUsers: [],
      allTasks: [],
    };
  },
  computed: {
    available() {
      return (this.loginUser.available || this.$route.name === 'LoginPage');
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.loginUser = await User.findUser(user.uid) || await User.createUser(user);
        this.allUsers = await User.allUsers();
        this.allTasks = await Task.allTasks();
        this.loading = false;
      } else {
        this.loading = false;
        this.$router.replace('/login');
      }
    });
  },
  methods: {
    async logout() {
      await Auth.logout();
      this.loginUser = {};
      this.allUsers = [];
      this.allTasks = [];
      this.$router.replace({ name: 'LoginPage' });
    },
  },
  watch: {
    async $route(to) {
      if (to.path === '/') {
        this.loading = true;
        this.allUsers = await User.allUsers();
        this.allTasks = await Task.allTasks();
        this.loading = false;
      }
    },
  },
  components: {
    AppHeader,
    AppLoading,
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
