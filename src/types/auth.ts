export interface UserRegistration {
  login: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber?: string;
  brithday?: Date;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}

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

export interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}

export interface PasswordRequest {
  password: string;
}

export interface Token {
  AccessToken: string;
  RefreshToken: string;
}

export type Role = "user" | "manager" | "moderator" | "admin";
