import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
	let totalPosts;
	let postsPerPage;
	const mockOnPageChange = jest.fn();
	let currentPage;

	const renderPagination = () => {
		render(
			<Pagination
				currentPage={currentPage}
				totalPosts={totalPosts}
				postsPerPage={postsPerPage}
				onPageChange={mockOnPageChange}
			/>
		);
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("must render the component", () => {
		renderPagination();
	});

	test("when total pages <= 10, must render all pages", () => {
		totalPosts = 20;
		postsPerPage = 2;
		const totalPages = Math.ceil(totalPosts / postsPerPage);

		renderPagination();

		const prevBtn = screen.getByText("Prev");
		const nextBtn = screen.getByText("Next");

		expect(totalPages).toBe(10);
		expect(prevBtn).toBeInTheDocument();
		expect(nextBtn).toBeInTheDocument();

		for (let page = 1; page < 10; page++) {
			expect(screen.getByText(page)).toBeInTheDocument();
		}
	});

	test("when current page <= 6, last page before ... is 8", () => {
		currentPage = 6;
		postsPerPage = 2;
		totalPosts = 200;
		const totalPages = Math.ceil(totalPosts / postsPerPage);

		renderPagination();

		// must render -> prev 1, 2, 3, 4, 5, 6, 7, 8, ..., 50 next
		for (let page = 1; page <= totalPages; page++) {
			if (page <= 8) {
				expect(screen.getByText(page)).toBeInTheDocument();
			}

			if (page > 8 && page < totalPages) {
				expect(screen.getByText("...")).toBeInTheDocument();
				expect(screen.queryByText(page)).not.toBeInTheDocument();
			}

			if ((page = totalPages)) {
				expect(screen.getByText(totalPages)).toBeInTheDocument();
			}
		}
	});

	test("when current page is >= total pages - 5", () => {
		currentPage = 45;
		postsPerPage = 2;
		totalPosts = 100;

		renderPagination();

		expect(screen.getByText("1")).toBeInTheDocument();

		for (let page = 42; page < 50; page++) {
			expect(screen.getByText(page)).toBeInTheDocument();
		}

		for (let page = 2; page < 42; page++) {
			expect(screen.getByText("...")).toBeInTheDocument();
			expect(screen.queryByText(page)).not.toBeInTheDocument();
		}
	});

	test("clicks on the previous button", () => {
		currentPage = 2;

		renderPagination();

		const prevBtn = screen.getByText("Prev");
		fireEvent.click(prevBtn);

		expect(mockOnPageChange).toHaveBeenCalledTimes(1);
	});

	test("must disable previous button when the current page is 1", () => {
		currentPage = 1;

		renderPagination();

		const prevBtn = screen.getByText("Prev");
		expect(prevBtn).toBeDisabled();
	});

	test("clicks on the next button", () => {
		currentPage = 1;

		renderPagination();

		const nextBtn = screen.getByText("Next");
		fireEvent.click(nextBtn);

		expect(mockOnPageChange).toHaveBeenCalledTimes(1);
	});

	test("must disable the next button when current page is the last one", () => {
		postsPerPage = 2;
		totalPosts = 10;
		const totalPages = Math.ceil(totalPosts / postsPerPage);
		currentPage = totalPages;

		renderPagination();

		const nextBtn = screen.getByText("Next");

		expect(nextBtn).toBeDisabled();
	});

	test("must disable the next button when exists only 1 page", () => {
		postsPerPage = 2;
		totalPosts = 0;
		const totalPages = Math.ceil(totalPosts / postsPerPage);
		currentPage = totalPages;

		renderPagination();

		const nextBtn = screen.getByText("Next");

		expect(nextBtn).toBeDisabled();
	});

	test("changes page clicking at the number page", () => {
		totalPosts = 10;
		postsPerPage = 2;
		currentPage = 1;

		renderPagination();
		const btnPage3 = screen.getByText("3");

		fireEvent.click(btnPage3);
		expect(mockOnPageChange).toHaveBeenCalledTimes(1);
	});

	test("the button of number page must be disabled if is the current page", () => {
		totalPosts = 10;
		postsPerPage = 2;
		currentPage = 1;

		renderPagination();
		const btnPage1 = screen.getByText(currentPage);

		expect(btnPage1).toBeDisabled();
	});
});
