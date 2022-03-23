import axios from "axios";
import moment from "moment";
import monthNames from "../../public/_months.js";
// global functions

// adding fetch data to payLoad object
function createDataObject(request) {
  let date;
  let indexOfMonth;
  let year;
  let dayes;
  request.fetchedData.forEach((d) => {
    //const { request.Cases } = d;
    // const { Cases } = d;
    let chosenItem = d[request.item];
    date = moment(d.Date, "YYYYMMDD");

    if (request.dataFilter === "Monthly") {
      indexOfMonth = date.format("M");
      year = date.format("YYYY");
      request.dataStorage.push({
        Year: year,
        tick: monthNames[indexOfMonth - 1],
        //total: Cases,
        total: chosenItem,
      });
    } else {
      dayes = date.format("MM/DD");
      year = date.format("YYYY");
      request.dataStorage.push({
        Year: year,
        tick: dayes,
        // total: Cases,
        total: chosenItem,
      });
    }
  });
  return request.dataStorage;
}
// Get monthly data
function getCustomData(request) {
  let totals = [];

  // Monthly data
  if (request.dataFilter === "Monthly") {
    monthNames.forEach((month) => {
      let filteredMonth = request.updatedPayload
        .filter((data) => {
          if (
            data.tick === month &&
            data.Year === "2020" &&
            data.tick !== undefined &&
            data.Year !== undefined
          ) {
            return true;
          }
        })
        .at(-1);

      totals.push(filteredMonth);
      // totals.push(filteredMonth.flat());
    });
  }

  // Daily data
  else if (request.dataFilter === "Daily") {
    totals = request.updatedPayload;
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
  // addCountryData ~= addConfirmedData
  async addConfirmedData(context, user) {
    let basicURL = "";
    let payLoad = [];
    let updatedPayload = [];
    let calculatedData = [];
    // Api request url
    basicURL = `https://api.covid19api.com/country/${user.country}/status/confirmed`;
    // Sending request
    const responseData = await sendRequest("GET", basicURL);
    // Updating payLoad
    const requestEntry = {
      fetchedData: responseData,
      dataStorage: payLoad,
      dataFilter: user.selection,
      item: "Cases",
    };
    //createFinalDataStorage(calculatedData, updatedPayload);
    updatedPayload = createDataObject(requestEntry);
    // Calculate total data
    const finalalizedEntry = { dataFilter: user.selection, updatedPayload };
    calculatedData = getCustomData(finalalizedEntry);

    // Commit final data object
    context.commit("createConfirmedData", calculatedData);
  },
  async addDeathsData(context, user) {
    let basicURL = "";
    let payLoad = [];
    let updatedPayload = [];
    let calculatedData = [];
    // Api url
    basicURL = `https://api.covid19api.com/dayone/country/${user.country}`;
    // Sending request
    const responseData = await sendRequest("GET", basicURL);
    // Updating payLoad
    const requestEntry = {
      fetchedData: responseData,
      dataStorage: payLoad,
      dataFilter: user.selection,
      item: "Deaths",
    };
    //createFinalDataStorage(calculatedData, updatedPayload);
    updatedPayload = createDataObject(requestEntry);
    // Calculate total data
    const finalalizedEntry = { dataFilter: user.selection, updatedPayload };
    calculatedData = getCustomData(finalalizedEntry);

    // Commit final data object
    context.commit("createDeathsData", calculatedData);
  },
};
