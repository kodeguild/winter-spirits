
import Vue from 'vue';
import store from './store/store';
import VueRouter from 'vue-router';
import vuexI18n from 'vuex-i18n';
import Vuebar from 'vuebar';

import en from './data/locales/en-us';
import ru from './data/locales/ru-ru';
// add new locales here

import App from './App.vue';
import IndexPage from './pages/IndexPage';
import FortuneCookies from './pages/FortuneCookies';
import Quote from './pages/Quote';
import ErrorPage from './pages/ErrorPage';

Vue.use(Vuebar);

Vue.use(VueRouter);
const routes = [
  {path: '/', component: IndexPage, props: true},
  {path: '/cookies', component: FortuneCookies, props: true},
  {path: '/quotes/:id', component: Quote, props: true},
  {path: '*', component: ErrorPage}
];

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
});

Vue.use(vuexI18n.plugin, store);
Vue.i18n.set('en');

Vue.i18n.add('en', en.translationsEn);
Vue.i18n.add('ru', ru.translationsRu);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
