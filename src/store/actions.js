import axios from "axios";
import moment from "moment";
// global functions

function calculateTotalMonthlyCases() {}
async function sendRequest(method, url) {
  try {
    const response = await axios({ method: method, url: url });
    const responseData = await response.data;

    return responseData;
  } catch (error) {
    alert(error.message);
  }
}
export default {
  async showGlobalInfo(context) {
    const basicURL = "https://api.covid19api.com/summary";
    const responseData = await sendRequest("GET", basicURL);
    context.commit("addGlobalData", responseData);
  },
  async addCountries(context) {
    const basicURL = "https://api.covid19api.com/countries";
    const responseData = await sendRequest("GET", basicURL);
    context.commit("addCountries", responseData);
  },
  async addCountryData(context) {
    let payLoad = [];
    const basicURL =
      "https://api.covid19api.com/country/Switzerland/status/confirmed";
    const responseData = await sendRequest("GET", basicURL);
    console.log(responseData);
    console.log("==============");
    // List of Months
    const monthNames = [
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Store response data inside of payLoad
    let date;
    let indexOfMonth;
    let year;
    responseData.forEach((d) => {
      const { Cases } = d;
      let date = moment(d.Date, "YYYYMMDD");
      // indexOfMonth = moment(d.Date, "YYYYMDD").format("M");
      // date = moment(d.Date, "YYYY/MM/DD");
      // // Get month name
      indexOfMonth = date.format("M");
      console.log("Month index:", indexOfMonth);
      year = date.format("YYYY");
      console.log("year", year);

      if (year === "2021")
        payLoad.push({
          Year: year,
          Month: monthNames[indexOfMonth - 1],
          total: Cases,
        });
    });
    const totals = [];

    // console.log("payload", payLoad);
    monthNames.forEach((month, index) => {
      let filteredMonth = payLoad
        .filter((data) => {
          return data.Month == month && data.Year === "2021";
        })
        .at(-1);
      totals.push(filteredMonth);
    });

    console.log("=============");
    console.log("totals", totals);

    // Commit final data object
    context.commit("addData", totals);
  },
};
