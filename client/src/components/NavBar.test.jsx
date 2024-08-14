import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";

describe("NavBar", () => {
	test("must render links", () => {
		render(
			<Router>
				<NavBar />
			</Router>
		);

		//searches only by text
		const linkPostsList = screen.getByText("Posts List");
		expect(linkPostsList).toBeInTheDocument();

		//searches by link role + text content
		const linkNewPost = screen.getByRole("link", { name: /New Post/ });
		expect(linkNewPost).toBeInTheDocument();
	});
});
