import { getTodos } from "@/api/todosApi";
import type {
  AsyncStatus,
  FilterType,
  MetaResponse,
  Todo,
  TodoInfo,
} from "@/types/todos";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type TodosState = {
  items: Todo[];
  filter: FilterType;
  info: TodoInfo | null;
  status: AsyncStatus;
  error: string | null;
};

const initialState: TodosState = {
  items: [],
  filter: "all",
  info: null,
  status: "idle",
  error: null,
};

export const loadTodos = createAsyncThunk<
  MetaResponse<Todo, TodoInfo>,
  FilterType,
  { rejectValue: string }
>("todos/loadTodos", async (filter, { rejectWithValue }) => {
  try {
    const todos = await getTodos(filter);
    return todos;
  } catch {
    return rejectWithValue("Не удалось загрузить задачи");
  }
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.items = action.payload.data;
        state.info = action.payload.info ?? null;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload ?? "Не удалось загрузить задачи";
      });
  },
});

export const { setFilter } = todosSlice.actions;
export default todosSlice.reducer;
