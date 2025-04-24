import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router";

test("renders the flag explorer heading", () => {
  render(<App />);

  const heading = screen.getByText(/2025 Ernest Muli/i);
  expect(heading).toBeInTheDocument();
});
