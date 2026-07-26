import { useState } from "react";

export default function CommentForm({ onSubmit }) {

    const [content, setContent] = useState("");

    const handleSubmit = () => {

        if (!content.trim()) return;

        onSubmit(content);

        setContent("");
    };

    return (
        <div>

            <input
                type="text"
                placeholder="Write a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={handleSubmit}>
                Post
            </button>

        </div>
    );
}