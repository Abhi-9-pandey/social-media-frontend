import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function CommentItem({
    comment,
    onUpdate,
    onDelete
}) {

    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(comment.content);

    const { loggedInUser } = useAuth();

    const save = () => {
        onUpdate(comment.id, content);
        setEditing(false);
    };

    return (
        <div className="comment-item">

            <strong>@{comment.username}</strong>
            <small style={{ color: "#888" }}>
                {new Date(comment.createdAt).toLocaleString()}
            </small>


            {editing ? (
                <>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <button onClick={save}>
                        Save
                    </button>
                </>
            ) : (
                <>
                    <p>{comment.content}</p>

                    {comment.username === loggedInUser && (
                        <>
                            <button onClick={() => setEditing(true)}>Edit</button>
                            <button onClick={() => onDelete(comment.id)}>
                                Delete
                            </button>
                        </>
                    )}


                </>
            )}

        </div>
    );
}