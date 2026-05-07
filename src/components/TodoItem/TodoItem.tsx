import { useState, type JSX } from "react";
import styles from "./TodoItem.module.css";
import type { Todo } from "@/types/todos";
import { deleteTodo, updateTodo } from "@/api/todosApi";
import { validateTodoTitle } from "@/utils/validation";
import { Button as AntButton } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FormOutlined,
} from "@ant-design/icons";

interface TodoItemProps {
  todo: Todo;
  setLoading: (loading: boolean) => void;
  loadTodos: () => Promise<void>;
}

export function TodoItem({
  todo,
  setLoading,
  loadTodos,
}: TodoItemProps): JSX.Element {
  const [editTitle, setEditTitle] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
    setError(null);
  };

  const handleDeleteTodo = async (id: Todo["id"]) => {
    try {
      setLoading(true);
      setError(null);
      await deleteTodo(id);
      await loadTodos();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка при удалении задачи");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTitle = async (id: Todo["id"], newTitle: string) => {
    try {
      const validatedTitle = validateTodoTitle(newTitle.trim());
      setLoading(true);
      setError(null);
      await updateTodo(id, { title: validatedTitle });
      await loadTodos();
      setEditTitle("");
      setIsEdit(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка при обновлении задачи");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleIsDone = async (id: Todo["id"], isDone: boolean) => {
    try {
      setLoading(true);
      setError(null);
      await updateTodo(id, { isDone });
      await loadTodos();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка при обновлении статуса задачи");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setError(null);
    setIsEdit(false);
  };

  const handleStartEdit = () => {
    setError(null);
    setIsEdit(true);
    setEditTitle(todo.title);
  };

  return isEdit ? (
    <div>
      <li className={styles.item}>
        <input
          type="text"
          className={styles.editInput}
          value={editTitle}
          placeholder={todo.title}
          onChange={handleUpdateTitleChange}
        />
        <AntButton icon={<CloseOutlined />} onClick={handleCancelEdit} danger />
        <AntButton
          icon={<FileAddOutlined />}
          onClick={() => handleSaveTitle(todo.id, editTitle)}
        />
      </li>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  ) : (
    <li className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.isDone}
        onChange={(e) => handleToggleIsDone(todo.id, e.target.checked)}
      />
      <span className={styles.title}>{todo.title}</span>
      <AntButton
        icon={<DeleteOutlined />}
        onClick={() => handleDeleteTodo(todo.id)}
        danger
      />
      <AntButton icon={<FormOutlined />} onClick={handleStartEdit} />
    </li>
  );
}
