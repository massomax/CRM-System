import type { User } from "@/types/auth";
import type { UsersState } from "./usersSlice";

export const replaceUserInState = (
  state: UsersState,
  updatedUser: User,
): void => {
  state.users = state.users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user,
  );

  if (state.selectedUser?.id === updatedUser.id) {
    state.selectedUser = updatedUser;
  }
};
