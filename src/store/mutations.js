export default {
    addGlobalData(state,payLoad){
      
        state.globalInfo = payLoad;
    },
    addCountries(state,payLoad){
        state.countries = payLoad;
    }
}