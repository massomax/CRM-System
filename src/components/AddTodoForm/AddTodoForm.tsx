import { useState } from "react";
import { AddIcon } from "../icons/icons";
import { validateTodoTitle } from "@/utils/validation";
import { createTodo } from "@/api/todosApi";
import styles from "./AddTodoForm.module.css";
import type { filterType } from "@/types/todos";

interface AddTodoFormProps {
  error: string | null;
  filter: filterType;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadTodos: () => Promise<void>;
}

export function AddTodoForm({ ...props }: AddTodoFormProps) {
  const [newTitle, setNewTitle] = useState<string>("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    props.setError(null);
  };
  const handleAddTodo = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = validateTodoTitle(newTitle);
      if (!result.ok) {
        props.setError(result.error);
        return;
      }
      props.setLoading(true);
      props.setError(null);

      await createTodo({ title: result.value });

      setNewTitle("");
      await props.loadTodos();
    } catch (error) {
      if (error instanceof Error) {
        props.setError(error.message);
        console.error("Ошибка при добавлении задачи:", error.message);
      } else {
        props.setError("Неизвестная ошибка при добавлении задачи");
        console.error("Неизвестная ошибка при добавлении задачи");
      }
    } finally {
      props.setLoading(false);
    }
  };
  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <div className={styles.row}>
        <input
          className={styles.input}
          value={newTitle}
          onChange={handleTitleChange}
        />
        <button className={styles.addBtn} type="submit">
          <AddIcon />
        </button>
      </div>
      {props.error && <p className={styles.error}>{props.error}</p>}
    </form>
  );
}
