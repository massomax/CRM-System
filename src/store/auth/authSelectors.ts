import type { RootState } from "@/store/store";

export const selectAuthStatus = (state: RootState) => state.auth.status;
