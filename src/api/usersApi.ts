import type {
  GetUserListParams,
  Role,
  User,
  UserListResponse,
  UserUpdateRequest,
} from "@/types/users";
import { api } from "./apiClient";

export interface RolesRequest {
  roles: Role[];
}

export type UserBlockRequest = {
  isBlocked: boolean;
};

export const getUserList = async (
  params?: GetUserListParams,
): Promise<UserListResponse> => {
  const response = await api.get<UserListResponse>("/users/", {
    params: {
      ...params,
      roles: params?.roles?.length ? params.roles.join(",") : undefined,
    },
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

export const deleteUser = async (id: User["id"]): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const setUserBlockStatus = async (
  id: User["id"],
  data: UserBlockRequest,
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}/block`, data);

  return response.data;
};

export const updateUserRoles = async (
  id: User["id"],
  data: RolesRequest,
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}/roles`, data);

  return response.data;
};
