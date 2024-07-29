import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { Link } from 'react-router-dom';

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const response = await fetch(API_URL);
                if (response.ok) {
                    const json = await response.json();
                    setPosts(json);
                } else {
                    throw response;
                }
            } catch (error) {
                setError("An error occured...");
                console.log("An error occured: ", error);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    const deletePost = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if(response.ok) {
                setPosts(posts.filter((post) => post.id !== id));
            } else {
                throw response;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="postContainer">
                    <h2>
                        <Link to={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                    </h2>
                    <p>{post.body}</p>

                    <div className="posts-links">
                        <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
                        {" | "}
                        <button onClick={() => deletePost(post.id)}>Delete Post</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostsList;