import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CountryGrid from "./components/CountryGrid";
import CountryDetail from "./components/CountryDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryGrid />} />
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
