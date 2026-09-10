import type { User } from "@/types/auth";
import type { RootState } from "../store";
import type { RequestStatusType } from "./usersSlice";

export const selectSelectedUser = (state: RootState): User | null =>
  state.users.selectedUser;

export const selectSelectedUserStatus = (state: RootState): RequestStatusType =>
  state.users.selectedUserStatus;

export const selectSelectedUserError = (state: RootState): string | null =>
  state.users.selectedUserError;

export const selectUpdateUserStatus = (state: RootState): RequestStatusType =>
  state.users.updateUserStatus;

export const selectUpdateUserError = (state: RootState): string | null =>
  state.users.updateUserError;
