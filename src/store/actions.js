import axios from "axios";

// global functions 
async function sendRequest(method, url) {
  const response = await axios({ method: method, url: url });

  const responseData = await response.data;

  if (response.statusText != "ok") {
    console.log("Somethig went wrong!");
  }
  return responseData;
}
export default {
  async showGlobalInfo(context) {
    const basicURL = "https://api.covid19api.com/summary";
    const responseData = await sendRequest("GET", basicURL);
    context.commit("addGlobalData", responseData);
  },
  async addCountries(context){
    const basicURL = "https://api.covid19api.com/countries";
    const responseData = await sendRequest("GET",basicURL);
    context.commit("addCountries",responseData);
  }
};
