import React from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import PostForm from "./PostForm";
import { objectToFormData } from "../../utils/formDataHelper";

function NewPostForm() {
    const navigate = useNavigate();

    const handleCreateSubmit = async (rawData) => {
        try {
            const formData = objectToFormData({ post: rawData });
            const response = await createPost(formData);
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