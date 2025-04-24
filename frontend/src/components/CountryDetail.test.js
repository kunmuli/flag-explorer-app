import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import CountryDetail from "./CountryDetail";
import { fetchCountryDetails } from "../api";

// Mock the fetchCountryDetails function
jest.mock("../api", () => ({
  fetchCountryDetails: jest.fn(),
}));

// Sample mock country data
const mockCountry = {
  name: "Botswana",
  population: 2351625,
  capital: "Gaborone",
  flag: "https://flagcdn.com/bw.svg",
};

describe("<CountryDetail />", () => {
  // Test loading state if it exists in the component
  it("renders loading state initially", () => {
    // Intentionally do not resolve immediately to simulate loading
    fetchCountryDetails.mockResolvedValueOnce({ data: mockCountry });

    render(
      <MemoryRouter initialEntries={["/country/botswana"]}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading country details/i)).toBeInTheDocument();
  });

  // Test the component displays country details correctly
  it("displays country details after fetch", async () => {
    fetchCountryDetails.mockResolvedValueOnce({ data: mockCountry });

    render(
      <MemoryRouter initialEntries={["/country/botswana"]}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Botswana")).toBeInTheDocument();
    expect(screen.getByText(/Gaborone/i)).toBeInTheDocument();
  });

  // Test the error message when the API fails
  it("displays an error message if the fetch fails", async () => {
    fetchCountryDetails.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <MemoryRouter initialEntries={["/country/botswana"]}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/Failed to fetch country details/i)
    ).toBeInTheDocument();
  });
});
