import type { RootState } from "@/store/store";

export const selectAuthStatus = (state: RootState): boolean =>
  state.auth.isAuthorizaed;
