import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../../services/postService';
import "./PostStyles.css";
import SearchBar from './SearchBar';
import usePostsData from "../../hooks/usePostsData";
import useURLSearchParam from '../../hooks/useURLSearchParam';

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("seach");
    const {
        posts: fetchedPosts, loading, error, 
    } = usePostsData(debouncedSearchTerm);

    useEffect(() => {
        if (fetchedPosts) { 
            setPosts(fetchedPosts);
        }
    }, [fetchedPosts]);

    const deletePostHandler = async (id) => {
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id));
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

    return (
        <div>
            <SearchBar
                value={searchTerm}
                onSearchChange={handleDebouncedSearchChange}
                onImmediateChange={handleImmediateSearchChange}
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
                    <div>{post.image_url && (
                        <img src={post.image_url} alt={post.title} className="post-image" />
                    )}
                    </div>
                    <div className="posts-links">
                        <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
                        {" | "}
                        <button onClick={() => deletePostHandler(post.id)}>Delete Post</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostsList;