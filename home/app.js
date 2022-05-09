// Documentation Link: https://api.covid19tracker.ca/docs/1.0/overview

const covidUrl = "https://api.covid19tracker.ca";

// Dropdown Menu to View Provinces
const dropdown = document.getElementById("provinces");

const dropdownProvinces = async () => {
  const provinceEndpoint = "/summary/split";
  const urlToFetch = `${covidUrl}${provinceEndpoint}`;
  try {
    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const nameCollect = [];
    if (response.ok) {
      const jsonResponse = await response.json();
      const data = jsonResponse.data;
      for (const key in data) {
        const element = data[key];
        let addOption = document.createElement("option");
        addOption.innerHTML = element.province;
        dropdown.appendChild(addOption);
      }
    }
  } catch (error) {
    alert(error);
  }
};
dropdownProvinces();

// Fetch and Display Data of All of Canada
let caseNumber = document.querySelector(".newCases");
let testNumber = document.querySelector(".newTests");
let recoveriesNumber = document.querySelector(".newRecoveries");

const canadaSummary = async () => {
  const summaryEndpoint = "/summary";
  const urlToFetch = `${covidUrl}${summaryEndpoint}`;

  try {
    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      const cases = jsonResponse.data[0].change_cases;
      const tests = jsonResponse.data[0].change_tests;
      const recoveries = jsonResponse.data[0].change_recoveries;
      caseNumber.innerHTML = `${cases}`;
      testNumber.innerHTML = `${tests}`;
      recoveriesNumber.innerHTML = `${recoveries}`;
    }
  } catch (error) {
    alert(error);
  }
};
canadaSummary();

// When a Province is selected
let value = dropdown.options[dropdown.selectedIndex].value;
dropdown.onchange = () => {
  value = dropdown.options[dropdown.selectedIndex].value;
  const selectedSummary = async () => {
    const summarySplitEndpoint = "/summary/split";
    const urlToFetch = `${covidUrl}${summarySplitEndpoint}`;
    try {
      const response = await fetch(urlToFetch, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      //loop through each data to make sure value === province
      if (response.ok) {
        const jsonResponse = await response.json();
        const splitSummary = jsonResponse.data;
        for (let i = 0; i < splitSummary.length; i++) {
          if (splitSummary[i].province === value) {
            const cases = splitSummary[i].change_cases;
            const tests = splitSummary[i].change_tests;
            const recoveries = splitSummary[i].change_recoveries;
            console.log(cases, tests, recoveries);
            return (
              (caseNumber.innerHTML = `${cases}`),
              (testNumber.innerHTML = `${tests}`),
              (recoveriesNumber.innerHTML = `${recoveries}`)
            );
          }
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  selectedSummary();
};

// Last Updated
let update = document.querySelector(".updated");
const lastUpdated = async () => {
  const updateEndpoint = "/summary/split";
  const urlToFetch = `${covidUrl}${updateEndpoint}`;

  try {
    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      const updates = jsonResponse.last_updated;
      update.innerHTML = `Last Updated: ${updates}`;
    }
  } catch (error) {
    alert(error);
  }
};

lastUpdated();

// TODO: Update h1 tag to say province or Canada
