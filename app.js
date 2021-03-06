// Documentation Link: https://api.covid19tracker.ca/docs/1.0/overview

const covidUrl = "https://api.covid19tracker.ca";

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Vaccination HTML
const htmlChangeVaccinations = document.querySelector(".numNewVaccinations");
const htmlChangeVaccinated = document.querySelector(".numNewVaccinated");
const htmlChangeBoosters = document.querySelector(".numNewBoosters");
const htmlChangeDistributed = document.querySelector(".numNewDistributed");
const htmlTotalVaccination = document.querySelector(".numTotalVaccination");
const htmlTotalVaccinated = document.querySelector(".numTotalVaccinated");
const htmlTotalBoosters = document.querySelector(".numTotalBoosters");
const htmlTotalDistributed = document.querySelector(".numTotalDistributed");
const htmlVaccinateUpdated = document.querySelector(".vaccineUpdated");

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
    console.log(error);
  }
};
dropdownProvinces();

// Fetch and Display Data of All of Canada
const caseNumber = document.querySelector(".newCases");
const testNumber = document.querySelector(".newTests");
const recoveriesNumber = document.querySelector(".newRecoveries");
const headerSummaryName = document.querySelector(".summaryHeader");
const headerVaccineName = document.querySelector(".vaccinationHeader");

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
    console.log(error);
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
            // For Summary Table
            const cases = splitSummary[i].change_cases;
            const tests = splitSummary[i].change_tests;
            const recoveries = splitSummary[i].change_recoveries;
            const newVaccine = splitSummary[i].change_vaccinations;
            const newVaccinated = splitSummary[i].change_vaccinated;
            const newBoosters =
              Number(splitSummary[i].change_boosters_1) +
              Number(splitSummary[i].change_boosters_2);
            const newDistributed = splitSummary[i].change_vaccines_distributed;
            const totalVaccine = splitSummary[i].total_vaccinations;
            const totalVaccinated = splitSummary[i].total_vaccinated;
            const totalBoosters =
              Number(splitSummary[i].total_boosters_1) +
              Number(splitSummary[i].total_boosters_2);
            const totalDistributed = splitSummary[i].total_vaccines_distributed;

            return (
              (caseNumber.innerHTML = `${cases}`),
              (testNumber.innerHTML = `${tests}`),
              (recoveriesNumber.innerHTML = `${recoveries}`),
              (htmlChangeVaccinations.innerHTML = newVaccine),
              (htmlChangeVaccinated.innerHTML = newVaccinated),
              (htmlChangeBoosters.innerHTML = newBoosters),
              (htmlChangeDistributed.innerHTML = newDistributed),
              (htmlTotalVaccination.innerHTML = totalVaccine),
              (htmlTotalVaccinated.innerHTML = totalVaccinated),
              (htmlTotalBoosters.innerHTML = totalBoosters),
              (htmlTotalDistributed.innerHTML = totalDistributed),
              (headerSummaryName.innerHTML = `Summary ${splitSummary[i].province}`),
              (headerVaccineName.innerHTML = `Vaccinations ${splitSummary[i].province}`)
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  selectedSummary();
};

// Last Updated
const summaryUpdate = document.querySelector(".summaryUpdated");
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
      summaryUpdate.innerHTML = `Last Updated: ${updates}`;
    }
  } catch (error) {
    console.log(error);
  }
};
lastUpdated();

// Vaccinations Data in Canada
const canadaVaccineData = async () => {
  const vaccineCanadaEndpoint = "/summary";
  const urlToFetch = `${covidUrl}${vaccineCanadaEndpoint}`;

  try {
    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      const newVaccination = jsonResponse.data[0].change_vaccinations;
      const newVaccinated = jsonResponse.data[0].change_vaccinated;
      const newBoosters =
        Number(jsonResponse.data[0].change_boosters_1) +
        Number(jsonResponse.data[0].change_boosters_2);
      const newDistributed = jsonResponse.data[0].change_vaccines_distributed;
      const totalVaccination = jsonResponse.data[0].total_vaccinations;
      const totalVaccinated = jsonResponse.data[0].total_vaccinated;
      const totalBoosters =
        Number(jsonResponse.data[0].total_boosters_1) +
        Number(jsonResponse.data[0].total_boosters_2);
      const totalDistributed = jsonResponse.data[0].total_vaccines_distributed;
      const vaccineUpdated = jsonResponse.last_updated;

      htmlChangeVaccinations.innerHTML = newVaccination;
      htmlChangeVaccinated.innerHTML = newVaccinated;
      htmlChangeBoosters.innerHTML = newBoosters;
      htmlChangeDistributed.innerHTML = newDistributed;
      htmlTotalVaccination.innerHTML = totalVaccination;
      htmlTotalVaccinated.innerHTML = totalVaccinated;
      htmlTotalBoosters.innerHTML = totalBoosters;
      htmlTotalDistributed.innerHTML = totalDistributed;
      htmlVaccinateUpdated.innerHTML = `Last Updated: ${vaccineUpdated}`;
    }
  } catch (error) {
    console.log(error);
  }
};
canadaVaccineData();

// News Feed API
const apiKey = "2ff3c47e76aa42e8b93c7d37e7777452";
const newsLink = "https://newsapi.org/v2/top-headlines?country=ca";
const newsFeed = document.querySelector(".newsFeed");

const recentNews = async () => {
  const covidEndpoint = "&q=covid&category=health";
  const urlToFetch = `${newsLink}${covidEndpoint}`;

  try {
    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Api-Key": "2ff3c47e76aa42e8b93c7d37e7777452",
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      const loopNews = () => {
        for (let i = 0; i < 8; i++) {
          const a = document.createElement("a");
          const img = new Image();
          const div = document.createElement("div");
          let withoutDash = jsonResponse.articles[i].title;
          withoutDash = withoutDash.split(" - ")[0];

          // Image Link
          img.src = jsonResponse.articles[i].urlToImage;
          img.onclick = function () {
            window.open(jsonResponse.articles[i].url);
          };
          // Title Linking
          a.setAttribute("href", jsonResponse.articles[i].url);
          a.innerText = withoutDash;

          // Combine title and text
          div.className = "container";
          div.append(img, a);
          newsFeed.appendChild(div);
        }
      };
      loopNews();
    }
  } catch (error) {
    console.log(error);
  }
};

recentNews();
