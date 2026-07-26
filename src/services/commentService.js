import api from "./api";

export const getComments = (postId) => {
  return api.get(`/comments/post/${postId}`);
};

export const createComment = (data) => {
  return api.post("/comments", data);
};

export const updateComment = (id, data) => {
  return api.put(`/comments/${id}`, data);
};

export const deleteComment = (id) => {
  return api.delete(`/comments/${id}`);
};