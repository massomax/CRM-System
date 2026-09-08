import type { RootState } from "@/store/store";
import type { User } from "@/types/auth";
import type { CurrentUserStatusType } from "./authSlice";

export const selectAuthStatus = (state: RootState): boolean =>
  state.auth.isAuthorizaed;

export const selectCurrentUser = (state: RootState): User | null =>
  state.auth.currentUser;

export const selectCurrentUserStatus = (
  state: RootState,
): CurrentUserStatusType => state.auth.currentUserStatus;

export const selectCurrentUserError = (state: RootState): string | null =>
  state.auth.currentUserError;
