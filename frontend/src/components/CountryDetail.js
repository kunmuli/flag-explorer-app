import React, { useEffect, useState } from "react";
import { fetchCountryDetails } from "../api";
import { useParams, Link } from "react-router";

const CountryDetail = () => {
  const { name } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCountryDetails(name);
        setDetails(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch country details. Please try again later.");
        console.error("Error fetching country details:", err);
        setLoading(false);
        setDetails(null);
      }
    };

    fetchDetails();
  }, [name]);

  if (loading) {
    return (
      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2">Loading country details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{error}</div>
        </div>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Countries
        </Link>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card country-card shadow p-4">
        <img
          src={details.flag}
          className="country-flag mb-4"
          alt={details.name}
        />
        <h2 className="country-name">{details.name}</h2>
        <p>
          <strong>Population:</strong> {details.population?.toLocaleString()}
        </p>
        <p>
          <strong>Capital:</strong> {details.capital}
        </p>
        <Link to="/" className="btn btn-outline-primary mt-3">
          Back
        </Link>
      </div>
    </div>
  );
};

export default CountryDetail;
