import { useState } from "react";
import { createPost } from "../../services/postService";
import "../../styles/global.css";

export default function CreatePost({ onPostCreated }) {

    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [visibility, setVisibility] = useState("PUBLIC");
    const demoImages = [
    "/demo-images/post1.jpg",
    "/demo-images/post2.jpg",
    "/demo-images/post3.jpg",
    "/demo-images/post4.jpg"
  ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {

            await createPost({
                content,
                imageUrl,
                visibility
            });

            setContent("");
            setImageUrl("");
            setVisibility("PUBLIC");
            alert("Post created successfully!");

            onPostCreated();

        } catch (error) {
            console.error(error);
            alert("Failed to create post");
        }
    };

    return (
        <div className="create-post">
            <form onSubmit={handleSubmit}>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    rows={4}
                />
                <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <br />

                <button type="submit">
                    Post
                </button>
            </form>

        </div>
    );
}