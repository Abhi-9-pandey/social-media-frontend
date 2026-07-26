import { useEffect, useState } from "react";
import { getFeed, getMyPosts } from "../../services/postService";
import PostCard from "./PostCard";

export default function Feed({ refresh }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPosts();
    }, [refresh]);

    const loadPosts = async () => {
        try {
            const response = await getFeed();
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                />
            ))}
        </>
    );
}