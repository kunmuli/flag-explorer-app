import React, { useEffect, useState } from "react";
import { fetchCountries } from "../api";
import { Link } from "react-router";
import Footer from "./Footer";

const CountryGrid = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCountries();
        setLoading(false);
        if (
          response &&
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          const sortedCountries = response.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setAllCountries(sortedCountries);
        } else {
          setError("No country data available.");
          setAllCountries([]);
        }
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch countries. Please try again later.");
        console.error("Error fetching countries:", err);
        setAllCountries([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredCountries = allCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountries.slice(
      indexOfFirstCountry,
      indexOfLastCountry
    );
    setDisplayedCountries(currentCountries);
  }, [allCountries, searchTerm, currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <=
    Math.ceil(
      allCountries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).length / countriesPerPage
    );
    i++
  ) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="container mt-4 d-flex flex-column align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2">Loading countries...</span>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 d-flex flex-column align-items-center">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container mt-4 d-flex flex-column">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row g-4">
        {displayedCountries.map((country) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-3" key={country.name}>
            <Link
              to={`/country/${country.name}`}
              className="text-decoration-none"
            >
              <div className="flag-wrapper">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="img-fluid shadow-sm flag-img"
                  title={country.name}
                />
              </div>
            </Link>
            <p className="country-name">{country.name}</p>
          </div>
        ))}
        {displayedCountries.length === 0 && !loading && !error && (
          <div className="col-12 text-center alert alert-warning" role="alert">
            <i className="bi bi-info-circle-fill me-2"></i>
            No countries match your search.
          </div>
        )}
      </div>
      {allCountries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).length > countriesPerPage && (
        <nav aria-label="Countries Pagination">
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <button className="page-link" onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === pageNumbers.length ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
      <Footer />
    </div>
  );
};

export default CountryGrid;
