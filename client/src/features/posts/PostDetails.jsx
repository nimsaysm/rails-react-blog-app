import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePost, fetchPost } from "../../services/postService";

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        setPost(json);
      } catch (e) {
        console.log("An error occurred:", e);
      }
    };
    fetchCurrentPost();
  }, [id]);

  const deletePostHandler = async () => {
    try {
      await deletePost(post.id);
      navigate("/");
    } catch (error) {
        console.error(error);
    }
  }

  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <Link to={`/posts/${id}/edit`}>Edit</Link>
        {" | "}
        <button onClick={deletePostHandler}>Delete</button>
      </div>
      <Link to="/">Back to Posts</Link>
    </div>
  );
}

export default PostDetails;