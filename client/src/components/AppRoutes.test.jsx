import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

// mocking links
jest.mock("../features/posts/PostsList", () => {
	const MockPostsList = () => <div>Test root</div>;
	return MockPostsList;
});

jest.mock("../features/posts/NewPostForm", () => {
	const MockNewPost = () => <div>Test /new</div>;
	return MockNewPost;
});

jest.mock("../features/posts/PostDetails", () => {
	const MockPostDetails = () => <div>Test /posts/:id</div>;
	return MockPostDetails;
});

jest.mock("../features/posts/PostEditForm", () => {
	const MockPostEdit = () => <div>Test /posts/:id/edit</div>;
	return MockPostEdit;
});

jest.mock("../constants", () => ({
	API_URL: "http://test-api-url",
}));

describe("AppRoutes", () => {
	const renderWithRouter = (ui, { initialEntries = ["/"] } = {}) => {
		return render(ui, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
			),
		});
	};

	test("root path renders PostsList", () => {
		renderWithRouter(<AppRoutes />, { initialEntries: ["/"] });
		const expectedText = "Test root";
		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	test("/new path renders NewPostForm", () => {
		renderWithRouter(<AppRoutes />, { initialEntries: ["/new"] });
		const expectedText = "Test /new";
		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	test("/posts/:id path renders PostDetails", () => {
		renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1"] });
		const expectedText = "Test /posts/:id";
		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	test("/posts/:id/edit path renders PostEditForm", () => {
		renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1/edit"] });
		const expectedText = "Test /posts/:id/edit";
		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});
});
