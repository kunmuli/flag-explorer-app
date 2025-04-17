const axios = require("axios");

const API_URL = "https://restcountries.com/v3.1/all";

async function getAllCountries() {
  const response = await axios.get(API_URL);
  return response.data.map((c) => ({
    name: c.name.common,
    flag: c.flags.svg,
  }));
}

async function getCountryByName(name) {
  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${name}`
  );
  const country = response.data.find(
    (c) => c.name.common.toLowerCase() === name.toLowerCase()
  );
  if (!country) return null;

  return {
    name: country.name.common,
    population: country.population,
    capital: country.capital?.[0] || "N/A",
    flag: country.flags.svg,
  };
}

module.exports = { getAllCountries, getCountryByName };
