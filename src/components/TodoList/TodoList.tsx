import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import type { Todo } from "@/types/todos";

export function TodoList({
  todos,
  loading,
  updateTitle,
  editingId,
  setEditingId,
  setUpdateTitle,
  onDeleteTodo,
  onToggleIsDone,
  onUpdateTitle,
  onHandleUpdateTitleChange,
}: {
  todos: Todo[];
  loading: boolean;
  updateTitle: string;
  editingId: Todo["id"] | null;
  setEditingId: (id: Todo["id"] | null) => void;
  setUpdateTitle: (title: string) => void;
  onUpdateTitle: (id: Todo["id"], newTitle: string) => void;
  onDeleteTodo: (id: Todo["id"]) => void;
  onToggleIsDone: (id: Todo["id"], isDone: boolean) => void;
  onHandleUpdateTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return loading ? (
    <p>Загрузка задач...</p>
  ) : todos.length === 0 ? (
    <p>Задачи не найдены</p>
  ) : (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTitle={updateTitle}
          editingId={editingId}
          setEditingId={setEditingId}
          setUpdateTitle={setUpdateTitle}
          onDeleteTodo={onDeleteTodo}
          onUpdateTitle={onUpdateTitle}
          onToggleIsDone={onToggleIsDone}
          onHandleUpdateTitleChange={onHandleUpdateTitleChange}
        />
      ))}
    </ul>
  );
}
