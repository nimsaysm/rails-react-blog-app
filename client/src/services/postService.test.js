import * as postService from "./postService";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("../constants", () => ({
	POSTS_URL: "http://test-api-url/posts",
	SEARCH_URL: "http://test-api-url/search",
}));

describe("postService", () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("fetch all posts", async () => {
		//data for test
		const data = [
			{ id: 1, title: "Test 1" },
			{ id: 2, title: "Test 2" },
		];

		fetch.mockResponseOnce(JSON.stringify(data));

		const result = await postService.fetchAllPosts();

		expect(result).toEqual(data);
	});

	test("throw error fetching all posts", async () => {
		fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

		//expect to throw the error
		await expect(postService.fetchAllPosts()).rejects.toThrow();
	});

	test("fetch a specific post", async () => {
		const postId = 1;
		const post = { id: postId, title: "Test 1" };

		fetch.mockResponseOnce(JSON.stringify(post));

		const result = await postService.fetchPost(postId);

		expect(result).toEqual(post);
	});

	test("throw error fetching a specific post", async () => {
		fetch.mockResponseOnce(JSON.stringify(), { status: 500 });

		await expect(postService.fetchPost(1)).rejects.toThrow();
	});

	test("creates a post", async () => {
		const postData = {
			id: 1,
			title: "Test post",
		};

		fetch.mockResponseOnce(JSON.stringify(postData));

		const result = await postService.createPost(postData);

		expect(result).toEqual(postData);
	});

	test("throw error creating a post", async () => {
		fetch.mockResponseOnce(JSON.stringify(), { status: 500 });

		await expect(postService.createPost()).rejects.toThrow();
	});

	test("updates a post", async () => {
		const postId = 1;

		const postData = {
			id: postId,
			title: "Post test",
		};

		fetch.mockResponseOnce(JSON.stringify(postData));

		const response = await postService.updatePost(postId, postData);

		expect(response).toEqual(postData);
	});

	test("throw error editing a post", async () => {
		fetch.mockResponseOnce(JSON.stringify(), { status: 500 });

		await expect(postService.updatePost).rejects.toThrow();
	});

	test("deletes a post", async () => {
		const postId = 1;

		fetch.mockResponseOnce(null, { status: 204 });

		const result = await postService.deletePost(postId);

		expect(result).toBe(null);
	});

	test("throw error deleting a post", async () => {
		fetch.mockResponseOnce({ status: 500 });

		await expect(postService.deletePost).rejects.toThrow();
	});

	test("searches posts", async () => {
		const query = "Test";

		const post = {
			id: 1,
			title: "Test",
		};

		fetch.mockResponseOnce(JSON.stringify(post));

		const result = await postService.searchPosts(query, 1);

		expect(result).toEqual(post);
	});

	test("throw search post error", async () => {
		fetch.mockResponseOnce(JSON.stringify(), { status: 500 });

		await expect(postService.searchPosts()).rejects.toThrow();
	});
});
