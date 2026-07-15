import type { Token } from "@/types/auth";

const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

let accessToken: string | null = null;

export function setAccessToken(token: Token["accessToken"]): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function clearAccessToken(): void {
  accessToken = null;
}

export function saveRefreshToken(
  refreshToken: string,
  isRememberMe: boolean,
): void {
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);

  const storage = isRememberMe ? localStorage : sessionStorage;

  storage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
}

export function getRefreshToken(): string | null {
  return (
    localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) ??
    sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
  );
}

export function clearRefreshToken(): void {
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
}

export function saveTokens(tokens: Token, isRememberMe: boolean): void {
  setAccessToken(tokens.accessToken);
  saveRefreshToken(tokens.refreshToken, isRememberMe);
}

export function clearTokens(): void {
  clearAccessToken();
  clearRefreshToken();
}

export function replaceRefreshToken(refreshToken: Token["refreshToken"]): void {
  if (localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)) {
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    return;
  }
  if (sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)) {
    sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  }
}
