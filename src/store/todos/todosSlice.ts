import { getTodos } from "@/api/todosApi";
import type { AsyncStatus, FilterType, Todo } from "@/types/todos";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TodosState = {
  items: Todo[];
  filter: FilterType;
  status: AsyncStatus;
  error: string | null;
};

const initialState: TodosState = {
  items: [],
  filter: "all",
  status: "idle",
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
  },
});

export const { setFilter } = todosSlice.actions;
export default todosSlice.reducer;
