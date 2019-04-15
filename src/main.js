import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyDvtjX1x12jUt9tMJS1vrOE_-QDVXxRnsk',
  authDomain: 'task-app-ea9e8.firebaseapp.com',
  databaseURL: 'https://task-app-ea9e8.firebaseio.com',
  projectId: 'task-app-ea9e8',
  storageBucket: 'task-app-ea9e8.appspot.com',
  messagingSenderId: '938136653077',
};
firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
