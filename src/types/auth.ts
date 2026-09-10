import type { Role } from "./users";

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
