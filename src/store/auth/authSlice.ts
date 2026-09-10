import { getProfile } from "@/api/userApi";
import { tokenManager } from "@/services/tokenManager";
import {
  updateUserRolesThunk,
  updateUserThunk,
} from "@/store/users/usersThunks";
import type { User } from "@/types/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type CurrentUserStatusType =
  | "idle"
  | "pending"
  | "fulfilled"
  | "rejected";

type AuthState = {
  isAuthorizaed: boolean;
  currentUser: User | null;
  currentUserStatus: CurrentUserStatusType;
  currentUserError: string | null;
};

const initialState: AuthState = {
  isAuthorizaed: false,
  currentUser: null,
  currentUserStatus: "idle",
  currentUserError: null,
};

export const initializeAuthThunk = createAsyncThunk<void>(
  "auth/initialize",
  async (_, { dispatch }) => {
    const isRefreshSuccess = await tokenManager.refreshTokens();

    if (!isRefreshSuccess) {
      dispatch(authLoggedOut());
      return;
    }

    dispatch(authLoggedIn());
    dispatch(getCurrentUserThunk());
  },
);

export const getCurrentUserThunk = createAsyncThunk<
  User,
  void,
  {
    rejectValue: string;
  }
>("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const data = await getProfile();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Неизвестная ошибка");
  }
});

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    authLoggedIn(state) {
      state.isAuthorizaed = true;
    },

    authLoggedOut(state) {
      state.isAuthorizaed = false;
      state.currentUser = null;
      state.currentUserError = null;
      state.currentUserStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserThunk.pending, (state) => {
        state.currentUserStatus = "pending";
        state.currentUserError = null;
      })

      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.currentUserStatus = "fulfilled";
        state.currentUserError = null;
      })

      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.currentUserStatus = "rejected";

        state.currentUserError =
          action.payload ?? action.error.message ?? "Неизвестная ошибка";
      })

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })

      .addCase(updateUserRolesThunk.fulfilled, (state, action) => {
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      });
  },
});

export const { authLoggedIn, authLoggedOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
