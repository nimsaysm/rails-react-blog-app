import { renderHook, waitFor, act } from "@testing-library/react";
import { fetchAllPosts, searchPosts } from "../services/postService";
import usePostsData from "./usePostsData";

jest.mock("../constants", () => ({
	API_URL: "http://test-api-url",
}));

jest.mock("../services/postService");

describe("usePostsData hook", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("must load posts without search term", async () => {
		const mockPostsList = {
			posts: [
				{
					id: 1,
					title: "Test 1",
				},
			],
			totalPosts: 1,
			perPage: 10,
		};

		fetchAllPosts.mockResolvedValue(mockPostsList);

		const { result } = renderHook(() => usePostsData());

		//mock fetchAllPosts call
		await act(async () => {
			const fetchedPosts = await fetchAllPosts(1);
			result.current.posts = fetchedPosts.posts;
			result.current.totalPosts = fetchedPosts.total_count;
			result.current.loading = false;
			result.current.perPage = fetchedPosts.per_page;
		});

		expect(result.current.posts).toEqual(mockPostsList.posts);
		expect(result.current.totalPosts).toBe(mockPostsList.total_count);
		expect(result.current.loading).toBe(false);
		expect(result.current.perPage).toBe(mockPostsList.per_page);
	});

	test("must load posts according to the search term", async () => {
		const mockPostsList = {
			posts: [
				{
					id: 1,
					title: "Test 1",
				},
				{
					id: 2,
					title: "Post 2",
				},
			],
			totalPosts: 2,
			perPage: 10,
		};

		searchPosts.mockResolvedValue(mockPostsList);

		const { result } = renderHook(() => usePostsData());

		await act(async () => {
			const searchedPosts = await searchPosts("Test", 1);
			result.current.posts = searchedPosts.posts;
			result.current.totalPosts = searchedPosts.total_count;
			result.current.loading = false;
			result.current.perPage = searchedPosts.per_page;
		});

		//must contains post with "Test"
		expect(result.current.posts).toEqual(
			expect.arrayContaining([
				{
					id: 1,
					title: "Test 1",
				},
			])
		);

		//must to not contains others posts
		expect(result.current.posts).not.toEqual(
			expect.arrayContaining([
				{
					id: 2,
					title: "Post 2",
				},
			])
		);

		expect(result.current.totalPosts).toBe(mockPostsList.total_count);
		expect(result.current.loading).toBe(false);
		expect(result.current.perPage).toBe(mockPostsList.per_page);
	});

	test("console load posts error", async () => {
		fetchAllPosts.mockRejectedValue(new Error("An error occurred..."));

		const { result } = renderHook(() => usePostsData());

		await act(async () => {
			try {
				jest.spyOn(console, "error").mockImplementation(jest.fn());
			} catch (error) {
				result.current.error = error;
				result.current.loading = false;
			}
		});

		expect(result.current.posts).toEqual([]);
		expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
			"An error occurred: ",
			new Error("An error occurred...")
		);
	});
});
