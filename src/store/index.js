import { createStore } from "vuex";
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";
const store = createStore({
  state() {
    return {
      globalInfo: [],
      countries: [],
      totalConfirmed: "",
      newConfirmed: "",
      totalDeaths: "",
      newDeaths: "",
      total: "",
      countryData: [],
      selectedCountry: "",
    };
  },

  actions: actions,

  mutations: mutations,
  getters: getters,
});

export default store;
