import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';

library.add(fas, fab);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
