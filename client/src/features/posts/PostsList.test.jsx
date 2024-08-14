import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostsList from "./PostsList";
import * as postService from "../../services/postService";
import * as usePostsData from "../../hooks/usePostsData";

jest.mock("../../constants", () => ({
	API_URL: "http://test-api-url",
}));

// simulate use from post service
jest.mock("../../services/postService");
jest.mock("../../hooks/usePostsData");

describe("PostsList", () => {
	const renderPostsList = () => {
		render(
			<MemoryRouter>
				<PostsList />
			</MemoryRouter>
		);
	};

	//before each test -> to avoid duplicate code
	beforeEach(() => {
		usePostsData.default.mockReturnValue({
			posts: [
				{ id: 1, title: "Test 1" },
				{ id: 2, title: "Test 2" },
				{ id: 3, title: "Test 3" },
				{ id: 4, title: "Test 4" },
				{ id: 5, title: "Test 5" },
				{ id: 6, title: "Test 6" },
			],
			totalPosts: 6,
			loading: false,
			error: null,
			perPage: 3,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("must render a list of posts", () => {
		renderPostsList();

		expect(screen.getByText("Test 1")).toBeInTheDocument();
		expect(screen.getByText("Test 2")).toBeInTheDocument();
		expect(screen.getByText("Test 3")).toBeInTheDocument();
	});

	test("delete a post when click the Delete Post button", async () => {
		renderPostsList();

		const btnDeletePost = screen.getAllByText("Delete Post");

		fireEvent.click(btnDeletePost[0]);

		postService.deletePost.mockImplementation((id) => {
			//trying delete id 1
			if (id === 1) {
				// if = null the delete was successful
				return Promise.resolve(null);
			} else {
				return Promise.reject(new Error("Delete action failed"));
			}
		});

		await waitFor(() => {
			// verify if delete post action was called with id 1
			expect(postService.deletePost).toHaveBeenCalledWith(1);
		});

		// tests if Test 1 is not showing at the screen (delete action was successful)
		expect(screen.queryByText("Test 1")).not.toBeInTheDocument();
	});

	test("console delete post error", async () => {
		renderPostsList();

		//create a new error
		postService.deletePost.mockRejectedValue(new Error("An error occurred..."));

		//mock console error
		jest.spyOn(console, "error").mockImplementation(jest.fn());

		//wait for click on delete btn
		await waitFor(() => {
			const btnDeletePost = screen.getAllByText("Delete Post");
			fireEvent.click(btnDeletePost[0]);
		});

		//expect the error
		await waitFor(() => {
			expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
				"An error occurred: ",
				new Error("An error occurred...")
			);
		});

		jest.spyOn(console, "error").mockRestore();
	});

	test("uses search bar", async () => {
		renderPostsList();

		const searchBar = screen.getByLabelText("Search");
		const searchValue = "Search Test";

		fireEvent.change(searchBar, { target: { value: searchValue } });

		// wait for search change (must change the search bar value)
		await waitFor(() => {
			expect(searchBar.value).toBe(searchValue);
		});
	});

	test("uses pagination", async () => {
		renderPostsList();

		const nextBtn = screen.getByRole("button", { name: "Next" });
		fireEvent.click(nextBtn);

		await waitFor(() => {
			expect(nextBtn).toBeInTheDocument();
		});
	});
});
