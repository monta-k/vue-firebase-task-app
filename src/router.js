import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import IndexPage from './views/IndexPage.vue';
import NewPage from './views/NewPage.vue';
import EditPage from './views/EditPage.vue';
import ShowPage from './views/ShowPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: 'task/new',
      name: 'NewPage',
      component: NewPage,
    },
    {
      path: 'task/edit',
      nema: 'EditPage',
      component: EditPage,
    },
    {
      path: 'task/:id',
      name: 'ShowPage',
      component: ShowPage,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
