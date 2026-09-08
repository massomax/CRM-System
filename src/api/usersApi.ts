import type { UserListResponse } from "@/types/auth";
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
