import type { User } from "@/types/users";
import { api } from "./apiClient";

export const getProfile = async (): Promise<User> => {
  const response = await api.get<User>("/users/profile");
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/user/logout");
};
