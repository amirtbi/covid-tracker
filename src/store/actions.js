import axios from "axios";
import moment from "moment";
import monthNames from "../../public/_months.js";
// global functions

// adding fetch data to payLoad object
function createDataObject(fetchedData, payLoad, dataType) {
  let date;
  let indexOfMonth;
  let year;
  let dayes;
  fetchedData.forEach((d) => {
    const { Cases } = d;
    date = moment(d.Date, "YYYYMMDD");
    if (dataType === "Monthly") {
      indexOfMonth = date.format("M");
      year = date.format("YYYY");
      payLoad.push({
        Year: year,
        tick: monthNames[indexOfMonth - 1],
        total: Cases,
      });
    } else {
      dayes = date.format("MM/DD");
      year = date.format("YYYY");
      payLoad.push({
        Year: year,
        tick: dayes,
        total: Cases,
      });
    }
  });
  return payLoad;
}
// Get monthly data
function getCustomData(dataType, dataContainer, yearChoice = "2020") {
  let totals = [];

  // Monthly data
  if (dataType === "Monthly") {
    monthNames.forEach((month, index) => {
      let filteredMonth = dataContainer
        .filter((data) => {
          return data.tick == month && data.Year === yearChoice;
        })
        .at(-1);
      totals.push(filteredMonth);
    });
  }

  // Daily data
  else if (dataType === "Daily") {
    totals = dataContainer;
  }

  return totals;
}
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
  async addCountryData(context, user) {
    console.log(user);
    let basicURL = `https://api.covid19api.com/country/${user.country}/status/confirmed`;
    const responseData = await sendRequest("GET", basicURL);
    // List of Months
    let payLoad = [];
    // Store response data inside of payLoad
    const updatedPayload = createDataObject(
      responseData,
      payLoad,
      user.selection
    );
    const calculatedData = getCustomData(
      user.selection,
      updatedPayload,
      "2020"
    );

    // Commit final data object
    context.commit("addData", calculatedData);
  },
};
