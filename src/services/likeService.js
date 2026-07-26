import api from "./api";

export const likePost = (postId) =>
  api.post("/likes", { postId });

export const unlikePost = (postId) =>
  api.delete(`/likes/${postId}`);

export const getLikeStatus = (postId) =>
  api.get(`/likes/${postId}`);