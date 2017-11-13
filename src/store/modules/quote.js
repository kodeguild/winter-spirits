
import quotes from '../../data/quotes/index';

const state = {
  quote: {}
};

const getters = {
  quote: state => {
    return state.quote;
  }
};

const mutations = {
  'FETCH_QUOTE' (state, payload) {
    state.quote = quotes[payload.lang][payload.id];
  }
};

const actions = {
  fetchQuote: ({commit}, payload) => {
    commit('FETCH_QUOTE', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
