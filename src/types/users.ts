export type Role = "user" | "manager" | "moderator" | "admin";

export interface User {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  birthday: string | null;
  roles: Role[];
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateRequest {
  userName: string;
  email: string;
  phoneNumber: string;
  birthday: string | null;
}

export interface UserListResponse {
  data: User[];
  total: number;
  meta: Record<string, unknown>;
}

export type UserSortField = "userName" | "email";

export type SortDirection = "asc" | "desc";

export interface GetUserListParams {
  limit: number;
  offset: number;
  search?: string;
  orderBy?: UserSortField;
  orderDir?: SortDirection;
  roles?: Role[];
}
