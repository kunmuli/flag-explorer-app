import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders footer content", () => {
  render(<Footer />);
  expect(screen.getByText(/©/i)).toBeInTheDocument();
});
