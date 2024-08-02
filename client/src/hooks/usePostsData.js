import { useEffect, useState } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService";

function usePostsData(searchTerm, page = 1) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPosts, setTotalPosts] = useState(0);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        // executes loadPosts when searchTerm or page number changes
        async function loadPosts() {
            try {
                let data;
                if (searchTerm) { 
                    // if there is a search term, will use searchPosts()
                    data = await searchPosts(searchTerm, page);
                } else {
                    // if there is not a searcch term, will fetch all posts according to the page
                    data = await fetchAllPosts(page);
                }

                if (data.posts) {
                    // if the API data return posts
                    setPosts(data.posts);
                    setTotalPosts(data.total_count);
                    setPerPage(data.per_page);
                }
                setLoading(false);
            } catch(e) {
                setError(e);
                setLoading(false);
                console.error(e);
            }
        }
        loadPosts();
    }, [searchTerm, page]);

    return { posts, totalPosts, loading, error, perPage };
}

export default usePostsData;