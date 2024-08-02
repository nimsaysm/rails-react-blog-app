import {POSTS_API_URL, SEARCH_API_URL} from "../constants";

// use 1 as a default value for page
async function fetchAllPosts(page = 1) {
    // GET to "http://localhost:3000/api/v1/posts?page={page}"
    const response = await fetch(`${POSTS_API_URL}?page=${page}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    // return response of API in JSON format
    return response.json();
}

async function fetchPost(id) {
    // GET to "http://localhost:3000/api/v1/posts?{id}"
    const response = await fetch(`${POSTS_API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function createPost(postData) {
    // POST sending data from post
    const response = await fetch(`${POSTS_API_URL}`, {
        method: "POST", 
        body: postData,
    }); 

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function updatePost(id, postData) {
    // PUT sending data from post
    const response = await fetch(`${POSTS_API_URL}/${id}`, {
        method: "PUT", 
        body: postData,
    }); 

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function deletePost(id) {
    // DELETE post according to the id
    const response = await fetch(`${POSTS_API_URL}/${id}`, {
        method: "DELETE",
    }); 

    if (response.status === 204) {
        // 204 -> action was successful, there is no more data for the deleted post
        return null;
    }

    // others responses !== 204
    throw new Error(response.statusText);
}

async function searchPosts(query, page = 1) {
    // GET to "http://localhost:3000/api/v1/search/posts/?q={query}&page={page}"
    const response = await fetch(`${SEARCH_API_URL}/posts/?q=${query}&page=${page}`);

    if(!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export { fetchAllPosts, fetchPost, createPost, updatePost, deletePost, searchPosts }