import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import type { Todo } from "@/types/todos";

export function TodoList({
  todos,
  loading,
  handleUpdateTitle,
  setEditingId,
  onDeleteTodo,
  editingId,
  handleToggleIsDone,
}: {
  todos: Todo[];
  loading: boolean;
  handleUpdateTitle: (id: Todo["id"], newTitle: string) => void;
  setEditingId: (id: Todo["id"] | null) => void;
  onDeleteTodo: (id: Todo["id"]) => void;
  editingId: number | null;
  handleToggleIsDone: (id: Todo["id"], isDone: boolean) => void;
}) {
  return loading ? (
    <p>Загрузка задач...</p>
  ) : todos.length === 0 ? (
    <p>Задачи не найдены</p>
  ) : (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          setEditingId={setEditingId}
          onDeleteTodo={onDeleteTodo}
          key={todo.id}
          handleUpdateTitle={handleUpdateTitle}
          editingId={editingId}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </ul>
  );
}
