import { useEffect, useState } from "react";

import {
    getComments,
    createComment,
    updateComment,
    deleteComment
} from "../../services/commentService";

import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

export default function CommentList({ postId }) {

    const [comments, setComments] = useState([]);

    const loadComments = async () => {

        try {

            const response = await getComments(postId);

            setComments(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadComments();
    }, []);

    const handleCreateComment = async (content) => {

        try {

            await createComment({
                postId,
                content
            });

            loadComments();

        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateComment = async (id, content) => {

        try {

            await updateComment(id, {
                content
            });

            loadComments();

        } catch (error) {
            console.error(error);
        }

    };

    const handleDeleteComment = async (id) => {

        try {

            await deleteComment(id);

            loadComments();

        } catch (error) {
            console.error(error);
        }

    };

    return (

        <div>

            <CommentForm
                onSubmit={handleCreateComment}
            />

            {comments.map(comment => (

                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onUpdate={handleUpdateComment}
                    onDelete={handleDeleteComment}
                />

            ))}

        </div>

    );
}