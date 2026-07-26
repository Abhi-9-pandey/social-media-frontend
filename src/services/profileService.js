import api from "./api";

export const getMyProfile = () =>
  api.get("/profile/me");

export const updateMyProfile = (data) =>
  api.put("/profile/me", data);

export const getProfile = (username) =>
  api.get(`/profile/${username}`);