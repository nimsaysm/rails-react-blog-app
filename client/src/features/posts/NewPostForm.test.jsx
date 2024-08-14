import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createPost } from "../../services/postService";
import "../../utils/formDataHelper";
import NewPostForm from "./NewPostForm";
import { MemoryRouter, Routes, Route } from "react-router-dom";

jest.mock("../../services/postService", () => ({
	// mock create post function
	createPost: jest.fn(() => {
		return {
			id: 1,
			title: "Test 1",
		};
	}),
}));

jest.mock("../../utils/formDataHelper");

jest.mock("../../constants", () => ({
	API_URL: "http://test-api-url",
}));

describe("NewPostForm", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const renderNewPostForm = () => {
		render(
			<MemoryRouter initialEntries={[`/new`]}>
				<Routes>
					<Route path="/new" element={<NewPostForm />} />
					<Route path="/posts/:id" element={<div>Post created</div>} />
				</Routes>
			</MemoryRouter>
		);
	};

	test("render component", () => {
		renderNewPostForm();

		expect(screen.getByText("Create a New Post")).toBeInTheDocument();
	});

	test("create a new Post", async () => {
		renderNewPostForm();

		//look for input by label content
		const titleInput = screen.getByLabelText("Title:");
		//input "Test 1"
		fireEvent.change(titleInput, { target: { value: "Test 1" } });

		await waitFor(() => {
			fireEvent.click(screen.getByText("Create Post"));
		});

		await waitFor(() => {
			//check if navigate to the new post
			expect(screen.getByText("Post created")).toBeInTheDocument();
		});
	});

	test("console errors", async () => {
		//create a new error
		createPost.mockRejectedValue(new Error("Failed to create post."));

		//mock console error
		jest.spyOn(console, "error").mockImplementation(jest.fn());

		renderNewPostForm();

		//try to create a post
		const titleInput = screen.getByLabelText("Title:");
		fireEvent.change(titleInput, { target: { value: "Test 1" } });
		await waitFor(() => {
			fireEvent.click(screen.getByText("Create Post"));
		});

		//expect the error
		expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
			"Failed to create post. ",
			new Error("Failed to create post.")
		);
	});
});
