import React from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import { objectToFormData } from "../../utils/formDataHelper";
import PostForm from "./PostForm";

function NewPostForm() {
    const navigate = useNavigate();

    const handleCreateSubmit = async (rawData) => {
        try {
            // obj -> { post: rawData }, namespace -> ""
            const formData = objectToFormData({ post: rawData });

            // create post with form data formatted
            const response = await createPost(formData);
            
            // after create, will redirect to "/posts/{new post id}"
            navigate(`/posts/${response.id}`);
        } catch (error) {
            console.error(e);
        }
    }

    return (
        <PostForm 
            headerText="Create a New Post"
            onSubmit={handleCreateSubmit}
            buttonText="Create Post"
        />
    );
}

export default NewPostForm;