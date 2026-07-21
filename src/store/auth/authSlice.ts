import { getTokens } from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthorizaed: boolean;
};

const initialState: AuthState = {
  isAuthorizaed: false,
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
      state.isAuthorizaed = true;
    },
    authLoggedOut(state) {
      state.isAuthorizaed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuthThunk.fulfilled, (state, action) => {
      state.isAuthorizaed = action.payload;
    });
  },
});

export const { authLoggedIn, authLoggedOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
