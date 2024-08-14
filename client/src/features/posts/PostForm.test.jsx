import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PostForm from "./PostForm";

describe("PostForm", () => {
	test("when no post props is passed, must render the default inputs", () => {
		const onSubmit = jest.fn();
		const textButton = "Submit";

		render(
			<PostForm
				headerText="New Post"
				onSubmit={onSubmit}
				buttonText={textButton}
			/>
		);

		expect(screen.getByText(/title/i)).toBeInTheDocument();
	});

	test("render post data in inputs", () => {
		const postData = {
			title: "Test",
		};
		const onSubmit = jest.fn();
		const textButton = "Submit";

		render(
			<PostForm
				post={postData}
				headerText="Edit Post"
				onSubmit={onSubmit}
				buttonText={textButton}
			/>
		);

		expect(screen.getByLabelText("Title:")).toHaveValue("Test");
	});

	test("must edit inputs", async () => {
		const postData = {
			title: "Initial title",
			body: "Body test",
			image: "",
		};
		const onSubmit = jest.fn();
		const textButton = "";

		render(
			<PostForm
				post={postData}
				headerText="Edit Post"
				onSubmit={onSubmit}
				buttonText={textButton}
			/>
		);

		const titleInput = screen.getByLabelText("Title:");
		const bodyInput = screen.getByLabelText("Body:");
		const imageInput = screen.getByLabelText("Image:");

		await waitFor(() => {
			fireEvent.change(titleInput, { target: { value: "Edited Post" } });
			fireEvent.change(bodyInput, { target: { value: "New body" } });
			fireEvent.change(imageInput, { target: { value: "" } });

			expect(titleInput).toHaveValue("Edited Post");
			expect(bodyInput).toHaveValue("New body");
			expect(imageInput).toHaveValue("");

			fireEvent.click(screen.getByRole("button"));
		});
	});
});
