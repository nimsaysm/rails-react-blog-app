import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as postService from "../../services/postService";
import "../../utils/formDataHelper";
import PostEditForm from "./PostEditForm";
import { MemoryRouter, Routes, Route } from "react-router-dom";

jest.mock("../../services/postService", () => ({
	fetchPost: jest.fn(() => ({
		id: 1,
		title: "Post before edit",
	})),
	updatePost: jest.fn(() => {
		return {
			id: 1,
			title: "Edited Post",
		};
	}),
}));

jest.mock("../../utils/formDataHelper");

jest.mock("../../constants", () => ({
	API_URL: "http://test-api-url",
}));

describe("PostEditForm", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const renderPostEditForm = () => {
		render(
			<MemoryRouter initialEntries={[`/posts/1/edit`]}>
				<Routes>
					<Route path="/posts/:id/edit" element={<PostEditForm />} />
					<Route path="/posts/:id" element={<div>Post edited</div>} />
				</Routes>
			</MemoryRouter>
		);
	};

	test("must render the post", async () => {
		renderPostEditForm();

		await waitFor(() => {
			expect(screen.getByLabelText("Title:")).toHaveValue("Post before edit");
		});
	});

	test("must edit the Post", async () => {
		renderPostEditForm();

		await waitFor(() => {
			const titleInput = screen.getByLabelText("Title:");
			fireEvent.change(titleInput, { target: { value: "Edited Post" } });
			expect(titleInput).toHaveValue("Edited Post");
		});

		await waitFor(() => {
			fireEvent.click(screen.getByText("Update Post"));
		});

		expect(screen.getByText("Post edited")).toBeInTheDocument();
	});

	test("console render post error", async () => {
		postService.fetchPost.mockRejectedValue(new Error("An error occurred."));

		jest.spyOn(console, "error").mockImplementation(jest.fn());

		renderPostEditForm();

		await waitFor(() => {
			expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
				"An error occurred: ",
				new Error("An error occurred.")
			);
		});
	});

	test("console edit post error", async () => {
		postService.updatePost.mockRejectedValue(new Error("An error occurred."));

		jest.spyOn(console, "error").mockImplementation(jest.fn());

		renderPostEditForm();

		await waitFor(() => {
			expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
				"An error occurred: ",
				new Error("An error occurred.")
			);
		});
	});
});
