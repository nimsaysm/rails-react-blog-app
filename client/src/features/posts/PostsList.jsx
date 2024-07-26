import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constants';

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

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="postContainer">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}

export default PostsList;