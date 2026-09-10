import type { User, UserListResponse, UserUpdateRequest } from "@/types/auth";
import { api } from "./apiClient";

type GetUserListParams = {
  limit: number;
  offset: number;
};

export const getUserList = async (
  params?: GetUserListParams,
): Promise<UserListResponse> => {
  const response = await api.get<UserListResponse>("/users/", {
    params,
  });
  return response.data;
};

export const getUserById = async (id: User["id"]): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const updateUser = async (
  id: User["id"],
  data: UserUpdateRequest,
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, data);
  return response.data;
};
