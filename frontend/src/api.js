import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchCountries = () => api.get("/countries");
export const fetchCountryDetails = (name) => api.get(`/countries/${name}`);
