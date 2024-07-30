import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts, deletePost } from '../../services/postService';
import "./PostStyles.css";

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await fetchAllPosts();
                setPosts(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    const deletePostHandler = async (id) => {
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
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