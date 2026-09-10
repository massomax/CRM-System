import type { User } from "@/types/auth";
import type { RootState } from "../store";
import type { RequestStatusType } from "./usersSlice";

export const selectUsers = (state: RootState): User[] => state.users.users;

export const selectUsersTotal = (state: RootState): number =>
  state.users.usersTotal;

export const selectUsersStatus = (state: RootState): RequestStatusType =>
  state.users.usersStatus;

export const selectUsersError = (state: RootState): string | null =>
  state.users.usersError;

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
