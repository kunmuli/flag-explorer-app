const express = require("express");
const app = express();
const cors = require("cors");
const countryService = require("./services/countryService");

const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/countries", async (req, res) => {
  try {
    const countries = await countryService.getAllCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

app.get("/countries/:name", async (req, res) => {
  try {
    const country = await countryService.getCountryByName(req.params.name);
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ error: "Country not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch country" });
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
