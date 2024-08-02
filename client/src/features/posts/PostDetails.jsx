import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePost, fetchPost } from "../../services/postService";
import "./PostStyles.css";

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        // search post by id
        const json = await fetchPost(id);
        // set the current post
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
      // after delete go to "/"
      navigate("/");
    } catch (error) {
        console.error(error);
    }
  }

  // if there is not a post will return Loading - while useEffect run
  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>{post.image_url && (
        <img src={post.image_url} alt={post.title} className="post-image" />
        )}
      </div>
      <div className="posts-links">
        <Link to={`/posts/${id}/edit`}>Edit</Link>
        {" | "}
        <button onClick={deletePostHandler}>Delete</button>
      </div>
      <Link to="/">Back to Posts</Link>
    </div>
  );
}

export default PostDetails;