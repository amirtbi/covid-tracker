export default {
  addGlobalData(state, payLoad) {
    state.totalConfirmed = payLoad.Global.TotalConfirmed;
    state.newConfirmed = payLoad.Global.NewConfirmed;
    state.totalDeaths = payLoad.Global.TotalDeaths;
    state.newDeaths = payLoad.Global.NewDeaths;
    state.globalInfo = payLoad;
  },
  addCountries(state, payLoad) {
    state.countries = payLoad;
  },
  addData(state, payLoad) {
    state.countryData = payLoad.filter((data) => {
      return data !== undefined;
    });
    console.log("added data", state.countryData);
  },
  setChosenCountry(state, countryName) {
    state.selectedCountry = countryName;
  },
};
