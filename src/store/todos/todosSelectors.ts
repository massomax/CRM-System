import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectTodosState = (state: RootState) => state.todos;

export const selectTodos = createSelector(
  selectTodosState,
  (todosState) => todosState.items,
);

export const selectFilterTodos = createSelector(
  selectTodosState,
  (todosState) => todosState.filter,
);

export const selectTodosStatus = createSelector(
  selectTodosState,
  (todosState) => todosState.status,
);

export const selectTodosError = createSelector(
  selectTodosState,
  (todosState) => todosState.error,
);

export const selectTodosInfo = createSelector(
  selectTodosState,
  (todosState) => todosState.info,
);
