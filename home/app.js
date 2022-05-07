const covidUrl = fetch("https://api.opencovid.ca");

const getProvince = async () => {
  const provinceRequestEndpoint = "/summary";
  const urlToFetch = covidUrl + provinceRequestEndpoint;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const regions = jsonResponse.region;
      return regions;
      console.log(regions);
    }
  } catch (error) {
    alert(error);
  }
};
