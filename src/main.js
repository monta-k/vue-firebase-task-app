import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
