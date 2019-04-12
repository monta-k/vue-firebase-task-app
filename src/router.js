import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './views/LoginPage'
import IndexPage from './views/IndexPage'
import EditPage from './views/EditPage'
import ShowPage from './views/ShowPage'

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
      component: LoginPage
    },
    {
      path: 'task/new',
      name: 'NewPage',
      component: NewPage
    },
    {
      path: 'task/edit',
      nema: 'EditPage',
      component: EditPage
    },
    {
      path: 'task/:id',
      name: 'ShowPage',
      component: ShowPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
});
