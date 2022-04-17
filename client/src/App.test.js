import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("render all router", () => {
  cleanup();
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
