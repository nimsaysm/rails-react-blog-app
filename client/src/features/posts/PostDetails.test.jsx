import React from "react";
import {
	render,
	screen,
	fireEvent,
	waitFor,
	getByAltText,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as postService from "../../services/postService";
import PostDetails from "./PostDetails";

jest.mock("../../constants", () => ({
	API_URL: "http://test-api-url",
}));

jest.mock("../../services/postService");

describe("PostDetails", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const post = {
		id: 1,
		title: "Test 1",
		image_url: "http://test-img-url",
	};

	const renderPostDetails = () => {
		render(
			<MemoryRouter initialEntries={[`/posts/${post.id}`]}>
				<Routes>
					<Route path="/posts/:id" element={<PostDetails />} />
					<Route path="/" element={<div>Posts List</div>} />
				</Routes>
			</MemoryRouter>
		);
	};

	test("must render a specific post", async () => {
		// fetch post function using the mock post object
		postService.fetchPost.mockResolvedValue(post);
		renderPostDetails();

		await waitFor(() => {
			expect(screen.getByText("Test 1")).toBeInTheDocument();

			const image = screen.getByAltText("Test 1");
			expect(image).toHaveAttribute("src", "http://test-img-url");

			expect(postService.fetchPost).toHaveBeenCalledTimes(1);
		});
	});

	test("console fetch post error", async () => {
		//create a new error
		postService.fetchPost.mockRejectedValue(new Error("An error occurred..."));

		//mock console error
		jest.spyOn(console, "error").mockImplementation(jest.fn());

		renderPostDetails();

		//expect the error
		await waitFor(() => {
			expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
				"An error occurred:",
				new Error("An error occurred...")
			);
		});

		jest.spyOn(console, "error").mockRestore();
	});

	test("delete a post when click the Delete button", async () => {
		postService.fetchPost.mockResolvedValue(post);
		renderPostDetails();

		//mockResolvedValue = short version for jest.fn().mockImplementation(() =>
		// Promise.resolve(value));
		postService.deletePost.mockResolvedValue();

		//wait for click on delete btn
		await waitFor(() => {
			const btnDeletePost = screen.getByText("Delete");
			fireEvent.click(btnDeletePost);
		});

		//verify if redirect to "/" -> PostsList
		await waitFor(() => {
			expect(screen.getByText("Posts List")).toBeInTheDocument();
		});
	});

	test("console delete error", async () => {
		postService.fetchPost.mockResolvedValue(post);

		//create a new error
		postService.deletePost.mockRejectedValue(new Error("An error occurred..."));

		//mock console error
		jest.spyOn(console, "error").mockImplementation(jest.fn());

		renderPostDetails();

		//wait for click on delete btn
		await waitFor(() => {
			const btnDeletePost = screen.getByText("Delete");
			fireEvent.click(btnDeletePost);
		});

		//expect the error
		await waitFor(() => {
			expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
				"An error occurred:",
				new Error("An error occurred...")
			);
		});

		jest.spyOn(console, "error").mockRestore();
	});
});
