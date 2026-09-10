import type { AuthData, Token, UserRegistration } from "@/types/auth";
import { apiPublic } from "./apiPublic";

export const signUp = async (payload: UserRegistration): Promise<void> => {
  await apiPublic.post<void>("/auth/signup", payload);
};

export const signIn = async (payload: AuthData): Promise<Token> => {
  const response = await apiPublic.post<Token>("/auth/signin", payload);
  return response.data;
};

export const refreshAccessToken = async (
  refreshToken: Token["RefreshToken"],
): Promise<Token> => {
  const response = await apiPublic.post<Token>("/auth/refresh", {
    refreshToken,
  });
  return response.data;
};
