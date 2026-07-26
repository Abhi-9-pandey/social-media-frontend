import api from "./api";

export const getFeed = () =>
  api.get("/posts");

export const createPost = (data) =>
  api.post("/posts", data);

export const getMyPosts = () =>
  api.get("/posts/me");

// export const deletePost = (id) =>
//   api.delete(`/api/posts/${id}`);