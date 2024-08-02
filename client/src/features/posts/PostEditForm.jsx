import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";
import { objectToFormData } from "../../utils/formDataHelper";
import PostForm from "./PostForm";

function PostEditForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams(); // id is searched in the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id); // search post by id in URL
        setPost(json);
      } catch (e) {
        setError(e);
      }
    };
    fetchCurrentPost();
  }, [id]);

  const handleUpdateSubmit = async (rawData) => {
    const sanitizedData = {
      // creates a object with datas sent by the form
      title: rawData.title, 
      body: rawData.body, 
      image: rawData.image, 
    }

    const formData = objectToFormData({ post: sanitizedData });

    try {
      await updatePost(id, formData);
      // after the update, redirect to "/posts/{id updated post}"
      navigate(`/posts/${id}`);
    } catch (e) {
      console.log("An error occurred:", e);
    }
  };

  // if there is not a post will return Loading - while useEffect run
  if (!post) return <h2>Loading...</h2>;

  return (
    <PostForm 
      post={post}
      onSubmit={handleUpdateSubmit}
      headerText="Edit Post"
      buttonText="Edit Post"
    />
  );
}

export default PostEditForm;