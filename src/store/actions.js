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
    //const { Cases } = d;
    const { Active } = d;
    date = moment(d.Date, "YYYYMMDD");

    if (dataType === "Monthly") {
      indexOfMonth = date.format("M");
      year = date.format("YYYY");
      payLoad.push({
        Year: year,
        tick: monthNames[indexOfMonth - 1],
        //total: Cases,
        total: Active,
      });
    } else {
      dayes = date.format("MM/DD");
      year = date.format("YYYY");
      payLoad.push({
        Year: year,
        tick: dayes,
        // total: Cases,
        total: Active,
      });
    }
  });
  return payLoad;
}
// Get monthly data
function getCustomData(dataType, dataContainer, yearChoice = "2021") {
  let totals = [];
  console.log("container", dataContainer);

  // Monthly data
  if (dataType === "Monthly") {
    monthNames.forEach((month) => {
      let filteredMonth = dataContainer
        .filter((data) => {
          if (
            data.tick === month &&
            data.Year === "2021" &&
            data.tick !== undefined &&
            data.Year !== undefined
          ) {
            return true;
          }
        })
        .at(-1);

      console.log("filtered", filteredMonth);
      totals.push(filteredMonth);
      // totals.push(filteredMonth.flat());
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
    //let basicURL = `https://api.covid19api.com/country/${user.country}/status/confirmed`;
    let basicURL = `https://api.covid19api.com/live/country/${user.country}`;
    const responseData = await sendRequest("GET", basicURL);
    // List of Months
    let payLoad = [];
    console.log("responseData", responseData);
    // Store response data inside of payLoad
    const updatedPayload = createDataObject(
      responseData,
      payLoad,
      user.selection
    );

    // console.log(updatedPayload);
    // Calculate total static for each month
    const calculatedData = getCustomData(
      user.selection,
      updatedPayload,
      "2020"
    );

    // Commit final data object
    context.commit("addData", calculatedData);
  },
};
