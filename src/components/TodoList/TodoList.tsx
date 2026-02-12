import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import type { filterType, Todo } from "@/types/todos";

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadTodos: (filter: filterType) => Promise<void>;
  filter: filterType;
}

export function TodoList({ ...props }: TodoListProps) {
  return props.loading ? (
    <p>Загрузка задач...</p>
  ) : props.todos.length === 0 ? (
    <p>Задачи не найдены</p>
  ) : (
    <ul className={styles.list}>
      {props.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setError={props.setError}
          setLoading={props.setLoading}
          loadTodos={props.loadTodos}
          filter={props.filter}
        />
      ))}
    </ul>
  );
}
