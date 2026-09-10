import type { User } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";
import {
  addBlockUserCases,
  addDeleteUserCases,
  addGetUserByIdCases,
  addGetUserListCases,
  addUpdateUserCases,
  addUpdateUserRolesCases,
} from "./usersBuilders";

export type RequestStatusType = "idle" | "pending" | "fulfilled" | "rejected";

export type UsersState = {
  users: User[];
  usersTotal: number;
  usersStatus: RequestStatusType;
  usersError: string | null;

  selectedUser: User | null;

  selectedUserStatus: RequestStatusType;
  selectedUserError: string | null;

  updateUserStatus: RequestStatusType;
  updateUserError: string | null;
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
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addGetUserListCases(builder);
    addGetUserByIdCases(builder);
    addUpdateUserCases(builder);
    addDeleteUserCases(builder);
    addBlockUserCases(builder);
    addUpdateUserRolesCases(builder);
  },
});

export const usersReducer = usersSlice.reducer;
