import { getTokens } from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthStatus = "initializtion" | "authenticated" | "unauthenticated";

type AuthState = {
  status: AuthStatus;
};

const initialState: AuthState = {
  status: "initializtion",
};

export const initializeAuthThunk = createAsyncThunk<boolean>(
  "auth/initialize",
  async () => {
    return getTokens();
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLoggedIn(state) {
      state.status = "authenticated";
    },
    authLoggedOut(state) {
      state.status = "unauthenticated";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuthThunk.pending, (state) => {
        state.status = "initializtion";
      })
      .addCase(initializeAuthThunk.fulfilled, (state, action) => {
        state.status = action.payload ? "authenticated" : "unauthenticated";
      })
      .addCase(initializeAuthThunk.rejected, (state) => {
        state.status = "unauthenticated";
      });
  },
});

export const { authLoggedIn, authLoggedOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
