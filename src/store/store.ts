import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/todosSlice";
import { authReducer } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
