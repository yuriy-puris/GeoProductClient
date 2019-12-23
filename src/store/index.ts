import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const ParamLocationModel = () => {
  return {
    lat: '',
    lon: '',
  };
};

export default new Vuex.Store({
  state: {
    currentLocation: ParamLocationModel(),
    currentLocationSearchAddress: ParamLocationModel(),
    searchAddress: '',
  },
  mutations: {
    setLocation(state, {item}) {
      state.currentLocation = item;
    },
    setLocationSearchAddress(state, {item}) {
      state.currentLocationSearchAddress = item;
    },
    setSearchAddress(state, {item}) {
      state.searchAddress = item;
    },
  },
  actions: {
  },
  modules: {
  },
});
