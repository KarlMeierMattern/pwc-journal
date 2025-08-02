import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import Home from "../home";

// Mock fetch globally
const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe("Home Component", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("shows loading state initially", () => {
    // Mock a pending fetch
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays fetched data successfully", async () => {
    const mockData = {
      userId: 1,
      id: 1,
      title: "Test Todo Item",
      completed: false,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Home />);

    // Wait for loading to finish and data to appear
    await waitFor(() => {
      expect(screen.getByText("Fetched data:")).toBeInTheDocument();
    });

    expect(screen.getByText("Test Todo Item")).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:3000/api/v1");
  });

  it("handles fetch errors", async () => {
    mockFetch.mockRejectedValueOnce(new Error("API Error"));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("calls API on component mount", () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<Home />);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:3000/api/v1");
  });
});
