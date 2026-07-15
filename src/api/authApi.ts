import type { AuthData, Token, UserRegistration } from "@/types/auth";
import { apiPublic } from "./apiPublic";

export async function signUp(payload: UserRegistration): Promise<void> {
  await apiPublic.post<void>("/auth/signup", payload);
}

export async function signIn(payload: AuthData): Promise<Token> {
  const response = await apiPublic.post<Token>("/auth/signin", payload);
  return response.data;
}

export async function refreshAccessToken(
  refreshToken: Token["refreshToken"],
): Promise<Token> {
  const response = await apiPublic.post<Token>("/auth/refresh", {
    refreshToken,
  });
  return response.data;
}
