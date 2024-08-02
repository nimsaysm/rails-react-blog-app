import React from "react";
import { Route, Routes } from "react-router-dom";

// components:
import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";
import NewPostForm from "../features/posts/NewPostForm";
import PostEditForm from "../features/posts/PostEditForm";

function AppRoutes() {
    return (
        <Routes>
            {/* path: URL, element: component to be render */}
            <Route path="/" element={<PostsList />} />
            <Route path="/new" element={<NewPostForm />} />
            <Route path="posts/:id" element={<PostDetails />} />
            <Route path="posts/:id/edit" element={<PostEditForm />} />
        </Routes>
    )
}

export default AppRoutes;