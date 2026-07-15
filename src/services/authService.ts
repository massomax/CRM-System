import { refreshAccessToken } from "@/api/authApi";
import {
  clearTokens,
  getRefreshToken,
  replaceRefreshToken,
  setAccessToken,
} from "../utils/tokenStorage";

let refreshPromise: Promise<boolean> | null = null;

export function getTokens(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = refreshTokens().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

async function refreshTokens(): Promise<boolean> {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      return false;
    }

    const tokens = await refreshAccessToken(refreshToken);

    setAccessToken(tokens.accessToken);

    replaceRefreshToken(tokens.refreshToken);

    console.log(tokens.accessToken, tokens.refreshToken);

    return true;
  } catch {
    clearTokens();
    return false;
  }
}
