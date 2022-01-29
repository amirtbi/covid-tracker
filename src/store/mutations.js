export default {
    addGlobalData(state,payLoad){
        state.totalConfirmed = payLoad.Global.TotalConfirmed;
        state.newConfirmed = payLoad.Global.NewConfirmed;
        state.totalDeaths = payLoad.Global.TotalDeaths;
        state.newDeaths = payLoad.Global.NewDeaths;
        state.globalInfo = payLoad;
    },
    addCountries(state,payLoad){
        state.countries = payLoad;
    }
}