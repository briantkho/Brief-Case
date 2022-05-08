const covidUrl = "https://api.covid19tracker.ca";
const dropdown = document.getElementById("provinces");

const getProvinces = async () => {
  const provinceEndpoint = "/provinces";
  const urlToFetch = `${covidUrl}${provinceEndpoint}`;
  try {
    const response = await fetch(urlToFetch);
    const nameCollect = [];
    if (response.ok) {
      const jsonResponse = await response.json();
      for (const key in jsonResponse) {
        const element = jsonResponse[key];
        let dropdownAdd = document.createElement("option");
        dropdownAdd.innerHTML = element.name;
        dropdown.appendChild(dropdownAdd);
      }
    }
  } catch (error) {
    alert(error);
  }
};
getProvinces();
