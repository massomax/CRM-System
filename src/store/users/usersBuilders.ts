import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { UsersState } from "./usersSlice";
import {
  deleteUserThunk,
  getUserByIdThunk,
  getUserListThunk,
  setUserBlockStatusThunk,
  updateUserRolesThunk,
  updateUserThunk,
} from "./usersThunks";
import { replaceUserInState } from "./usersStateHelpers";

export const addGetUserListCases = (
  builder: ActionReducerMapBuilder<UsersState>,
): void => {
  builder
    .addCase(getUserListThunk.pending, (state) => {
      state.usersStatus = "pending";
      state.usersError = null;
    })
    .addCase(getUserListThunk.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.usersTotal = action.payload.total;
      state.usersStatus = "fulfilled";
      state.usersError = null;
    })
    .addCase(getUserListThunk.rejected, (state, action) => {
      state.usersStatus = "rejected";
      state.usersError =
        action.payload ??
        action.error.message ??
        "Неизвестная ошибка при загрузке списка пользователей";
    });
};

export const addGetUserByIdCases = (
  builder: ActionReducerMapBuilder<UsersState>,
): void => {
  builder
    .addCase(getUserByIdThunk.pending, (state) => {
      state.selectedUserStatus = "pending";
      state.selectedUserError = null;
      state.selectedUser = null;

      state.updateUserStatus = "idle";
      state.updateUserError = null;
    })
    .addCase(getUserByIdThunk.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
      state.selectedUserStatus = "fulfilled";
      state.selectedUserError = null;
    })
    .addCase(getUserByIdThunk.rejected, (state, action) => {
      state.selectedUserStatus = "rejected";
      state.selectedUserError =
        action.payload ??
        action.error.message ??
        "Неизвестная ошибка при получении данных пользователя";
    });
};

export const addUpdateUserCases = (
  builder: ActionReducerMapBuilder<UsersState>,
): void => {
  builder
    .addCase(updateUserThunk.pending, (state) => {
      state.updateUserStatus = "pending";
      state.updateUserError = null;
    })
    .addCase(updateUserThunk.fulfilled, (state, action) => {
      state.updateUserStatus = "fulfilled";
      state.updateUserError = null;

      replaceUserInState(state, action.payload);
    })
    .addCase(updateUserThunk.rejected, (state, action) => {
      state.updateUserStatus = "rejected";
      state.updateUserError =
        action.payload ??
        action.error.message ??
        "Неизвестная ошибка при обновлении данных пользователя";
    });
};

export const addDeleteUserCases = (
  builder: ActionReducerMapBuilder<UsersState>,
): void => {
  builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
    state.users = state.users.filter((user) => user.id !== action.payload);

    state.usersTotal = Math.max(0, state.usersTotal - 1);

    if (state.selectedUser?.id === action.payload) {
      state.selectedUser = null;
    }
  });
};

export const addBlockUserCases = (
  builder: ActionReducerMapBuilder<UsersState>,
): void => {
  builder.addCase(setUserBlockStatusThunk.fulfilled, (state, action) => {
    replaceUserInState(state, action.payload);
  });
};

export const addUpdateUserRolesCases = (
  builder: ActionReducerMapBuilder<UsersState>,
): void => {
  builder.addCase(updateUserRolesThunk.fulfilled, (state, action) => {
    replaceUserInState(state, action.payload);
  });
};
