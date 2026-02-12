import { useState } from "react";
import { CancelIcon, DeleteIcon, EditIcon, SaveIcon } from "../icons/icons";
import styles from "./TodoItem.module.css";
import type { filterType, Todo } from "@/types/todos";
import { deleteTodo, updateTodo } from "@/api/todosApi";
import { validateTodoTitle } from "@/utils/validation";

interface TodoItemProps {
  todo: Todo;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadTodos: (filter: filterType) => Promise<void>;
  filter: filterType;
}

export function TodoItem({ ...props }: TodoItemProps) {
  const [updateTitle, setUpdateTitle] = useState<string>("");
  const [editingId, setEditingId] = useState<Todo["id"] | null>(null);

  const handleUpdateTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.target.value);
    props.setError(null);
  };

  const handleDeleteTodo = async (id: Todo["id"]) => {
    try {
      props.setLoading(true);
      props.setError(null);
      await deleteTodo(id);
      await props.loadTodos(props.filter);
    } catch (error) {
      if (error instanceof Error) {
        props.setError(error.message);
        console.error("Ошибка при удалении задачи:", error.message);
      } else {
        props.setError("Неизвестная ошибка при удалении задачи");
        console.error("Неизвестная ошибка при удалении задачи");
      }
    } finally {
      props.setLoading(false);
    }
  };

  const handleUpdateTitle = async (id: Todo["id"], newTitle: string) => {
    try {
      const result = validateTodoTitle(newTitle);
      if (!result.ok) {
        props.setError(result.error);
        return;
      }
      props.setLoading(true);
      props.setError(null);
      await updateTodo(id, { title: result.value });
      await props.loadTodos(props.filter);
      setUpdateTitle("");
      setEditingId(null);
    } catch (error) {
      if (error instanceof Error) {
        props.setError(error.message);
        console.error("Ошибка при обновлении задачи:", error.message);
      } else {
        props.setError("Неизвестная ошибка при обновлении задачи");
        console.error("Неизвестная ошибка при обновлении задачи");
      }
    } finally {
      props.setLoading(false);
    }
  };

  const handleToggleIsDone = async (id: Todo["id"], isDone: boolean) => {
    try {
      props.setLoading(true);
      props.setError(null);
      await updateTodo(id, { isDone });
      await props.loadTodos(props.filter);
    } catch (error) {
      if (error instanceof Error) {
        props.setError(error.message);
        console.error("Ошибка при обновлении статуса задачи:", error.message);
      } else {
        props.setError("Неизвестная ошибка при обновлении статуса задачи");
        console.error("Неизвестная ошибка при обновлении статуса задачи");
      }
    } finally {
      props.setLoading(false);
    }
  };

  return editingId === props.todo.id ? (
    <li className={styles.item}>
      <input
        type="text"
        className={styles.editInput}
        value={updateTitle}
        placeholder={props.todo.title}
        onChange={handleUpdateTitleChange}
      />
      <button type="button" onClick={() => setEditingId(null)}>
        <CancelIcon />
      </button>
      <button
        type="button"
        onClick={() => {
          handleUpdateTitle(props.todo.id, updateTitle);
        }}>
        <SaveIcon />
      </button>
    </li>
  ) : (
    <li className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={props.todo.isDone}
        onChange={(e) => handleToggleIsDone(props.todo.id, e.target.checked)}
      />
      <span className={styles.title}>{props.todo.title}</span>
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => handleDeleteTodo(props.todo.id)}>
        <DeleteIcon />
      </button>
      <button
        type="button"
        className={styles.editBtn}
        onClick={() => {
          setEditingId(props.todo.id);
          setUpdateTitle(props.todo.title);
        }}>
        <EditIcon />
      </button>
    </li>
  );
}
