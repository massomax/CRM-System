import {
  deleteUser,
  getUserById,
  getUserList,
  setUserBlockStatus,
  updateUser,
  updateUserRoles,
} from "@/api/usersApi";
import type {
  GetUserListParams,
  Role,
  User,
  UserListResponse,
  UserUpdateRequest,
} from "@/types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserListThunk = createAsyncThunk<
  UserListResponse,
  GetUserListParams,
  {
    rejectValue: string;
  }
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
  {
    rejectValue: string;
  }
>("users/getUserById", async (id, { rejectWithValue }) => {
  try {
    return await getUserById(id);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(
      "Неизвестная ошибка при получении данных выбранного пользователя",
    );
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
    }

    return rejectWithValue(
      "Неизвестная ошибка при обновлении данных пользователя",
    );
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
    }

    return rejectWithValue(
      "Неизвестная ошибка при попытке удаления пользователя",
    );
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
