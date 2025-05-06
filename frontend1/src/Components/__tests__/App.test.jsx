import { render, screen, waitFor } from "@testing-library/react";
import LandingPage from "../../Pages/LandingPage"; // adjust the import based on your file structure
import { vi, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Mock the global fetch function with vitest
vi.mock("global", () => ({
  fetch: vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            lab: "LabA",
            name: "Test",
            quantity: 100,
          },
        ]),
    })
  ),
}));

describe("LandingPage", () => {
  it("loads data and displays it", async () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    // Wait for the loading text to disappear
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull(), {
      timeout: 5000,
    });


    // Wait for the data to be displayed
    const item = await screen.findByText("Test");
    expect(item).toBeInTheDocument();
  });
});
