export default {
  summary(state) {
    return state.globalInfo;
  },
  countries(state) {
    return state.countries;
  },
  totalConfirmed(state) {
    return state.totalConfirmed;
  },
  newConfirmed(state) {
    return Number(state.newConfirmed);
  },

  totalDeaths(state) {
    return Number(state.totalDeaths);
  },
  newDeaths(state) {
    return Number(state.newDeaths);
  },
  total(state, getters) {
    return getters.totalDeaths + getters.newDeaths + getters.newConfirmed;
  },
  countryStatic(state) {
    return state.countryData;
  },
  selectedCountry(state) {
    if (state.selectedCountry === "") {
      return "Switzerland";
    } else {
      return state.selectedCountry;
    }
  },
};
