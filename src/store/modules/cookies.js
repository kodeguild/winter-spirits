
import cookies from '../../data/cookies/index';

const state = {
  cookies: []
};

const getters = {
  cookies: state => {
    return state.cookies;
  }
};

const mutations = {
  'FETCH_COOKIES' (state, lang) {
    state.cookies = cookies[lang];
  }
};

const actions = {
  fetchCookies: ({commit}, lang) => {
    commit('FETCH_COOKIES', lang);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
