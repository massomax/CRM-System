import { createTodo, deleteTodo, getTodos, updateTodo } from "@/api/todosApi";
import {
  type AsyncStatus,
  type FilterType,
  type MetaResponse,
  type Todo,
  type TodoInfo,
  type TodoRequest,
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

type CreateTodoTitle = {
  title: string;
};

type UpdateTodoPayload = {
  id: Todo["id"];
  data: TodoRequest;
};

const initialState: TodosState = {
  items: [],
  filter: "all",
  info: null,
  status: "idle",
  error: null,
};

export const loadTodosThunk = createAsyncThunk<
  MetaResponse<Todo, TodoInfo>,
  FilterType,
  { rejectValue: string }
>("todos/loadTodosThunk", async (filter, { rejectWithValue }) => {
  try {
    const todos = await getTodos(filter);
    return todos;
  } catch {
    return rejectWithValue("Не удалось загрузить задачи");
  }
});

export const createTodoThunk = createAsyncThunk<
  void,
  CreateTodoTitle,
  { rejectValue: string }
>("todos/createTodoThunk", async ({ title }, { rejectWithValue }) => {
  try {
    await createTodo({ title });
  } catch {
    return rejectWithValue("Не удалось создать задачу");
  }
});

export const updateTodoThunk = createAsyncThunk<
  void,
  UpdateTodoPayload,
  { rejectValue: string }
>("todos/updateTodoThunk", async ({ id, data }, { rejectWithValue }) => {
  try {
    await updateTodo(id, data);
  } catch {
    return rejectWithValue("Не удалось обновить задачу");
  }
});

export const deleteTodoThunk = createAsyncThunk<
  void,
  Todo["id"],
  { rejectValue: string }
>("todos/deleteTodoThunk", async (id, { rejectWithValue }) => {
  try {
    await deleteTodo(id);
  } catch {
    return rejectWithValue("Не удалось удалить задачу");
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
      .addCase(loadTodosThunk.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(loadTodosThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.items = action.payload.data;
        state.info = action.payload.info ?? null;
      })
      .addCase(loadTodosThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload ?? "Не удалось загрузить задачи";
      });
  },
});

export const { setFilter } = todosSlice.actions;
export default todosSlice.reducer;
