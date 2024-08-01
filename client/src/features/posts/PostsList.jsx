import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { deletePost } from "../../services/postService";
import "./PostStyles.css";
import SearchBar from "./SearchBar";
import usePostsData from "../../hooks/usePostsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";
import Pagination from "./Pagination";

function PostsList() {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] =
		useURLSearchParam("search");
	const [searchParams, setSearchParams] = useSearchParams();

	const initialPageFromURL = Number(searchParams.get("page") || "1");
	const [currentPage, setCurrentPage] = useState(initialPageFromURL);

	const [posts, setPosts] = useState([]);
	const {
		posts: fetchedPosts,
		totalPosts: totalPosts,
		loading: loading,
		error: error,
		perPage: perPage,
	} = usePostsData(debouncedSearchTerm, currentPage);

	useEffect(() => {
		if (fetchedPosts) {
			setPosts(fetchedPosts);
		}
	}, [fetchedPosts]);

	useEffect(() => {
		const initialSearchTerm = searchParams.get("search") || "";
		setSearchTerm(initialSearchTerm);

		const pageFromURL = searchParams.get("page") || "1";
		setCurrentPage(Number(pageFromURL));
	}, [searchParams]);

	const deletePostHandler = async (id) => {
		try {
			await deletePost(id);
			setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	const handleImmediateSearchChange = (searchValue) => {
		setSearchTerm(searchValue);
	};

	const handleDebouncedSearchChange = (searchValue) => {
		setDebouncedSearchTerm(searchValue);
	};

    const handlePageChange = (page) => {
		setCurrentPage(page);
		setSearchParams({ search: debouncedSearchTerm, page: page });
	};

	return (
		<div>
			<SearchBar
				value={searchTerm}
				onSearchChange={handleDebouncedSearchChange}
				onImmediateChange={handleImmediateSearchChange}
			/>

			<Pagination
				currentPage={currentPage}
				totalPosts={totalPosts}
				postsPerPage={perPage}
				onPageChange={handlePageChange}
			/>

			{loading && <p>Loading...</p>}
			{error && <p>Error loading posts.</p>}

			{posts.map((post) => (
				<div key={post.id} className="postContainer">
					<h2>
						<Link to={`/posts/${post.id}`} className="post-title">
							{post.title}
						</Link>
					</h2>
					<p>{post.body}</p>
					<div>
						{post.image_url && (
							<img
								src={post.image_url}
								alt={post.title}
								className="post-image"
							/>
						)}
					</div>
					<div className="posts-links">
						<Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
						{" | "}
						<button onClick={() => deletePostHandler(post.id)}>
							Delete Post
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default PostsList;
