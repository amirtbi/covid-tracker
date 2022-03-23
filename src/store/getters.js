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
  // countryStatic ~= Confirms
  Confirms(state) {
    return state.confirmedData;
  },
  Deaths(state) {
    return state.deathsData;
  },
  selectedCountry(state) {
    if (state.selectedCountry === "") {
      return "Switzerland";
    } else {
      return state.selectedCountry;
    }
  },
};
