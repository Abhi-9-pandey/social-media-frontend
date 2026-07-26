// src/components/post/PostCard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { likePost, unlikePost, getLikeStatus } from "../../services/likeService";
import CommentList from "../comment/CommentList";
import "../../styles/global.css";

export default function PostCard({ post }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        loadLikeStatus();
    }, []);

    const loadLikeStatus = async () => {
        try {
            const response = await getLikeStatus(post.id);
            if (response.data.postId === post.id) {
                setLiked(response.data.liked);
                setLikeCount(response.data.likeCount);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLike = async () => {
        try {
            if (liked) {
                setLiked(false);
                setLikeCount(likeCount - 1);
                await unlikePost(post.id);
            } else {
                setLiked(true);
                setLikeCount(likeCount + 1);
                await likePost(post.id);
            }
            
        } catch (error) {
            console.error(error);
            setLiked(!liked);
            setLikeCount(likeCount + (liked ? 1 : -1));
        }
    };

    return (
        <div className="post-card" >
            
            {/* Make the username clickable */}
            <h3 className="post-username">
                <Link to={`/profile/${post.username}`}>
                    @{post.username}
                </Link>
            </h3>

            <p className="post-content">{post.content}</p>

            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt="Post"
                    className="post-image"
                />
            )}

            <br />
            <small className="post-meta">
                {new Date(post.createdAt).toLocaleString()}
            </small>
            <br /><br />

            <div className="post-actions">
                <button onClick={handleLike} className="like-btn">
                    {liked ? "❤️" : "🤍"} {likeCount}
                </button>

                <button onClick={() => setShowComments(!showComments)} style={{ cursor: "pointer" }}>
                    💬 Comment
                </button>
            </div>

            {showComments && (
                <div className="post-comments">
                    <CommentList postId={post.id} />
                </div>
            )}
        </div>
    );
}