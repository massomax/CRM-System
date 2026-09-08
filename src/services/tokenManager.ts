import { refreshAccessToken } from "@/api/authApi";
import type { Token } from "@/types/auth";

const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

export class TokenManager {
  private static instance: TokenManager | null = null;

  private accessToken: Token["AccessToken"] | null = null;
  private refreshPromise: Promise<boolean> | null = null;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }

    return TokenManager.instance;
  }

  getAccessToken(): Token["AccessToken"] | null {
    return this.accessToken;
  }

  saveTokens(tokens: Token, isRememberMe: boolean): void {
    this.accessToken = tokens.AccessToken;
    this.saveRefreshToken(tokens.RefreshToken, isRememberMe);
  }

  clearTokens(): void {
    this.accessToken = null;
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }

  refreshTokens(): Promise<boolean> {
    if (!this.refreshPromise) {
      this.refreshPromise = this.performRefresh().finally(() => {
        this.refreshPromise = null;
      });
    }

    return this.refreshPromise;
  }

  private async performRefresh(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();

      if (!refreshToken) {
        return false;
      }

      const tokens = await refreshAccessToken(refreshToken);

      this.accessToken = tokens.AccessToken;
      this.replaceRefreshToken(tokens.RefreshToken);

      return true;
    } catch {
      this.clearTokens();
      return false;
    }
  }

  private saveRefreshToken(
    refreshToken: Token["RefreshToken"],
    isRememberMe: boolean,
  ): void {
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);

    const storage = isRememberMe ? localStorage : sessionStorage;
    storage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  }

  private getRefreshToken(): Token["RefreshToken"] | null {
    return (
      localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) ??
      sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
    );
  }

  private replaceRefreshToken(refreshToken: Token["RefreshToken"]): void {
    if (localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)) {
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
      return;
    }

    if (sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)) {
      sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    }
  }
}

export const tokenManager = TokenManager.getInstance();
