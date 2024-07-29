import React from "react";
import { Route, Routes } from "react-router-dom";
import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";
import NewPostForm from "../features/posts/NewPostForm";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/new" element={<NewPostForm />} />
            <Route path="posts/:id" element={<PostDetails />} />
        </Routes>
    )
}

export default AppRoutes;