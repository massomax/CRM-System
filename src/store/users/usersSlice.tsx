import { getUserById, updateUser } from "@/api/usersApi";
import type { User, UserUpdateRequest } from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "pending" | "fulfilled" | "rejected";

type UsersState = {
  selectedUser: User | null;
  selectedUserStatus: RequestStatusType;
  selectedUserError: string | null;
  updateUserStatus: RequestStatusType;
  updateUserError: string | null;
};

const initialState: UsersState = {
  selectedUser: null,
  selectedUserStatus: "idle",
  selectedUserError: null,
  updateUserStatus: "idle",
  updateUserError: null,
};

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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      });
  },
});

export const usersReducer = usersSlice.reducer;
