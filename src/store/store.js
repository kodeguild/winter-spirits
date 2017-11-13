
import Vue from 'vue';
import Vuex from 'vuex';

import cookies from './modules/cookies';
import quote from './modules/quote';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    cookies,
    quote
  },
  strict: debug
});
