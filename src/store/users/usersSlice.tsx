import {
  deleteUser,
  getUserById,
  getUserList,
  setUserBlockStatus,
  updateUser,
  updateUserRoles,
} from "@/api/usersApi";
import type {
  Role,
  User,
  UserListResponse,
  UserUpdateRequest,
} from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "pending" | "fulfilled" | "rejected";

type UsersState = {
  users: User[];
  usersTotal: number;
  usersStatus: RequestStatusType;
  usersError: string | null;

  selectedUser: User | null;

  selectedUserStatus: RequestStatusType;
  selectedUserError: string | null;

  updateUserStatus: RequestStatusType;
  updateUserError: string | null;

  deleteUserStatus: RequestStatusType;
  deleteUserError: string | null;

  blockUserStatus: RequestStatusType;
  blockUserError: string | null;

  updateUserRolesStatus: RequestStatusType;
  updateUserRolesError: string | null;
};

const initialState: UsersState = {
  users: [],
  usersTotal: 0,
  usersStatus: "idle",
  usersError: null,

  selectedUser: null,

  selectedUserStatus: "idle",
  selectedUserError: null,

  updateUserStatus: "idle",
  updateUserError: null,

  deleteUserStatus: "idle",
  deleteUserError: null,

  blockUserStatus: "idle",
  blockUserError: null,

  updateUserRolesStatus: "idle",
  updateUserRolesError: null,
};

export const getUserListThunk = createAsyncThunk<
  UserListResponse,
  {
    limit: number;
    offset: number;
  },
  { rejectValue: string }
>("users/getUserList", async (params, { rejectWithValue }) => {
  try {
    return await getUserList(params);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(
      "Неизвестная ошибка при загрузке списка пользователей",
    );
  }
});

export const getUserByIdThunk = createAsyncThunk<
  User,
  User["id"],
  { rejectValue: string }
>("users/getUserById", async (id, { rejectWithValue }) => {
  try {
    return await getUserById(id);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(
        "Неизвестная ошибка при получение данных выбранного пользователя.",
      );
    }
  }
});

export const updateUserThunk = createAsyncThunk<
  User,
  {
    id: User["id"];
    data: UserUpdateRequest;
  },
  {
    rejectValue: string;
  }
>("users/updateUser", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await updateUser(id, data);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(
        "Неизвестная ошибка при обновлении данных пользователя",
      );
    }
  }
});

export const deleteUserThunk = createAsyncThunk<
  User["id"],
  User["id"],
  {
    rejectValue: string;
  }
>("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await deleteUser(id);
    return id;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(
        "Неизвестная ошибка при попытке удаления пользователя",
      );
    }
  }
});

export const setUserBlockStatusThunk = createAsyncThunk<
  User,
  {
    id: User["id"];
    isBlocked: boolean;
  },
  {
    rejectValue: string;
  }
>(
  "users/setUserBlockStatus",
  async ({ id, isBlocked }, { rejectWithValue }) => {
    try {
      return await setUserBlockStatus(id, {
        isBlocked,
      });
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(
        "Неизвестная ошибка при изменении статуса пользователя",
      );
    }
  },
);

export const updateUserRolesThunk = createAsyncThunk<
  User,
  {
    id: User["id"];
    roles: Role[];
  },
  {
    rejectValue: string;
  }
>("users/updateUserRoles", async ({ id, roles }, { rejectWithValue }) => {
  try {
    return await updateUserRoles(id, {
      roles,
    });
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(
      "Неизвестная ошибка при изменении ролей пользователя",
    );
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      })
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
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.updateUserStatus = "pending";
        state.updateUserError = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.updateUserStatus = "fulfilled";
        state.updateUserError = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.updateUserStatus = "rejected";
        state.updateUserError =
          action.payload ??
          action.error.message ??
          "Неизвестная ошибка при получении данных пользователя";
      })

      .addCase(deleteUserThunk.pending, (state) => {
        state.deleteUserStatus = "pending";
        state.deleteUserError = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.deleteUserStatus = "fulfilled";
        state.deleteUserError = null;

        state.users = state.users.filter((user) => user.id !== action.payload);

        state.usersTotal -= 1;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.deleteUserStatus = "rejected";
        state.deleteUserError =
          action.payload ??
          action.error.message ??
          "Неизвестная ошибка при удалении пользователя";
      })

      .addCase(setUserBlockStatusThunk.pending, (state) => {
        state.blockUserStatus = "pending";
        state.blockUserError = null;
      })
      .addCase(setUserBlockStatusThunk.fulfilled, (state, action) => {
        state.blockUserStatus = "fulfilled";
        state.blockUserError = null;

        state.selectedUser = action.payload;

        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        );
      })
      .addCase(setUserBlockStatusThunk.rejected, (state, action) => {
        state.blockUserStatus = "rejected";

        state.blockUserError =
          action.payload ??
          action.error.message ??
          "Неизвестная ошибка при изменении статуса пользователя";
      })

      .addCase(updateUserRolesThunk.pending, (state) => {
        state.updateUserRolesStatus = "pending";
        state.updateUserRolesError = null;
      })
      .addCase(updateUserRolesThunk.fulfilled, (state, action) => {
        state.updateUserRolesStatus = "fulfilled";
        state.updateUserRolesError = null;

        state.selectedUser = action.payload;

        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        );
      })
      .addCase(updateUserRolesThunk.rejected, (state, action) => {
        state.updateUserRolesStatus = "rejected";

        state.updateUserRolesError =
          action.payload ??
          action.error.message ??
          "Неизвестная ошибка при изменении ролей пользователя";
      });
  },
});

export const usersReducer = usersSlice.reducer;
