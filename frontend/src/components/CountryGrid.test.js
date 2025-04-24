import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import CountryGrid from "./CountryGrid";
import { fetchCountries } from "../api";

// Mock the fetchCountries API
jest.mock("../api", () => ({
  fetchCountries: jest.fn(),
}));

// Shared mock data
const mockCountries = [
  { name: "Botswana", flag: "https://flagcdn.com/bw.svg" },
  { name: "Tonga", flag: "https://flagcdn.com/to.svg" },
  { name: "Greece", flag: "https://flagcdn.com/gr.svg" },
  { name: "Sint Maarten", flag: "https://flagcdn.com/sx.svg" },
  { name: "Ivory Coast", flag: "https://flagcdn.com/ci.svg" },
  { name: "Ecuador", flag: "https://flagcdn.com/ec.svg" },
  { name: "Palau", flag: "https://flagcdn.com/pw.svg" },
  { name: "Kyrgyzstan", flag: "https://flagcdn.com/kg.svg" },
  { name: "Egypt", flag: "https://flagcdn.com/eg.svg" },
  { name: "North Korea", flag: "https://flagcdn.com/kp.svg" },
  { name: "Cape Verde", flag: "https://flagcdn.com/cv.svg" },
  { name: "Vatican City", flag: "https://flagcdn.com/va.svg" },
  { name: "Bhutan", flag: "https://flagcdn.com/bt.svg" },
  { name: "Saint Lucia", flag: "https://flagcdn.com/lc.svg" },
];

describe("<CountryGrid />", () => {
  it("renders loading state initially", () => {
    fetchCountries.mockResolvedValueOnce({ data: mockCountries });

    render(
      <MemoryRouter>
        <CountryGrid />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading countries/i)).toBeInTheDocument();
  });

  it("fetches and displays countries after loading", async () => {
    fetchCountries.mockResolvedValueOnce({ data: mockCountries });

    render(
      <MemoryRouter>
        <CountryGrid />
      </MemoryRouter>
    );

    expect(await screen.findByText("Botswana")).toBeInTheDocument();
    expect(await screen.findByText("Egypt")).toBeInTheDocument();
    expect(await screen.findByText("Greece")).toBeInTheDocument();
  });

  it("displays an error message when the API call fails", async () => {
    fetchCountries.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <MemoryRouter>
        <CountryGrid />
      </MemoryRouter>
    );

    // Wait for the error message to appear
    expect(
      await screen.findByText(/Failed to fetch countries/i)
    ).toBeInTheDocument();
  });

  it("displays fallback error if data is empty", async () => {
    fetchCountries.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <CountryGrid />
      </MemoryRouter>
    );

    // Wait for the fallback message
    expect(
      await screen.findByText(/No country data available/i)
    ).toBeInTheDocument();
  });

  it("filters countries based on search term", async () => {
    fetchCountries.mockResolvedValueOnce({ data: mockCountries });

    render(
      <MemoryRouter>
        <CountryGrid />
      </MemoryRouter>
    );

    await screen.findByText("Botswana");

    const searchInput = screen.getByPlaceholderText(/search countries/i);
    await userEvent.type(searchInput, "T");

    expect(screen.getByText("Tonga")).toBeInTheDocument();
    expect(screen.queryByText("Greece")).toBeNull();
  });

  it("navigates to country detail page when a country is clicked", async () => {
    fetchCountries.mockResolvedValueOnce({ data: mockCountries });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <CountryGrid />
      </MemoryRouter>
    );

    expect(await screen.findByText("Egypt")).toBeInTheDocument();
    const countryLink = screen.getByRole("link", { name: "Egypt" });
    await userEvent.click(countryLink);
    expect(countryLink).toHaveAttribute("href", "/country/Egypt");
  });

  it("displays a maximum of 12 countries per page", async () => {
    fetchCountries.mockResolvedValueOnce({ data: mockCountries });

    render(
      <MemoryRouter>
        <CountryGrid />
      </MemoryRouter>
    );

    expect(await screen.findByText("Egypt")).toBeInTheDocument();
    const countryElements = screen.getAllByRole("link");
    expect(countryElements.length).toBeLessThanOrEqual(12);
  });

  it("displays pagination controls when there are more than 12 countries", async () => {
    fetchCountries.mockResolvedValueOnce({ data: mockCountries });

    render(
      <MemoryRouter>
        <CountryGrid />
      </MemoryRouter>
    );

    expect(await screen.findByText("Egypt")).toBeInTheDocument();

    const paginationElement = screen.queryByRole("navigation", {
      name: /Countries Pagination/i,
    });
    expect(paginationElement).toBeInTheDocument();
  });

  it("correctly handles pagination", async () => {
    fetchCountries.mockResolvedValueOnce({ data: mockCountries });

    render(
      <MemoryRouter>
        <CountryGrid />
      </MemoryRouter>
    );

    await screen.findByText("Botswana");

    const page2Button = screen.getByRole("button", { name: "2" });
    await userEvent.click(page2Button);

    expect(await screen.findByText("Tonga")).toBeInTheDocument();
    expect(screen.queryByText("Botswana")).not.toBeInTheDocument();

    const countryElements = screen.getAllByRole("link");
    expect(countryElements.length).toBeLessThanOrEqual(2);
  });
});
