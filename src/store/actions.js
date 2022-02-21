import axios from "axios";
import moment from 'moment'
// global functions 
async function sendRequest(method, url) {

  try{
    const response = await axios({ method: method, url: url });
    const responseData = await response.data;

    return responseData;
  }
  catch(error){
    alert(error.message);
  }

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
  },
  async addCountryData(context) {
    let payLoad = [];
    const basicURL =  "https://api.covid19api.com/total/dayone/country/south-africa/status/confirmed"
    const responseData = await sendRequest("GET", basicURL);

    responseData.forEach(d => {
      const { Cases } = d;
      const date = moment(d.Date,"YYYYMDD").format("MM/DD");
      payLoad.push({date,total:Cases})
    })
    // console.log('payload',payLoad)
    context.commit("addData", payLoad);
  
  }
  
};
