import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
	let searchValue;
	const mockOnImmediateChange = jest.fn();
	const mockOnSearchChange = jest.fn();

	const renderSearchBar = () => {
		render(
			<SearchBar
				value={searchValue}
				onSearchChange={mockOnSearchChange}
				onImmediateChange={mockOnImmediateChange}
			/>
		);
	};

	test("must call immediate change", async () => {
		renderSearchBar();

		//checks if the inputs is being render
		const inputSearch = screen.getByLabelText("Search");
		expect(inputSearch).toBeInTheDocument();

		await waitFor(() => {
			fireEvent.change(inputSearch, { target: { value: "Test" } });
			expect(mockOnImmediateChange).toHaveBeenCalledWith("Test");
		});
	});

	test("must handle search debounce", async () => {
		jest.useFakeTimers();
		jest.spyOn(global, "setTimeout");
		jest.spyOn(global, "clearTimeout");

		const searchDebounceRef = jest
			.spyOn(React, "useRef")
			.mockReturnValueOnce({ current: null });
		renderSearchBar();

		const inputSearch = screen.getByLabelText("Search");

		await waitFor(() => {
			fireEvent.change(inputSearch, { target: { value: "Test" } });

			if (searchDebounceRef.current) {
				jest.clearAllTimers();
			}

			jest.advanceTimersByTime(500);
		});

		expect(setTimeout).toHaveBeenCalled();
		expect(clearTimeout).toHaveBeenCalled();
	});
});
