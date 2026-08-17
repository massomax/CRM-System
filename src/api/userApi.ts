import type { Profile } from "@/types/auth";
import { api } from "./apiClient";

export const getProfile = async (): Promise<Profile> => {
  const response = await api.get<Profile>("/user/profile");
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/user/logout");
};
