import { useState, type JSX } from "react";
import { AddIcon } from "@/ui/icons";
import { validateTodoTitle } from "@/utils/validation";
import { createTodo } from "@/api/todosApi";
import styles from "./AddTodoForm.module.css";

interface AddTodoFormProps {
  setLoading: (loading: boolean) => void;
  loadTodos: () => Promise<void>;
}

export function AddTodoForm({  setLoading, loadTodos }: AddTodoFormProps): JSX.Element {

  const [newTitle, setNewTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleEditTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    setError(null);
  };

  const handleAddTodo = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const validatedTitle = validateTodoTitle(newTitle.trim());
      setLoading(true);
      setError(null);

      await createTodo({ title: validatedTitle });

      setNewTitle("");
      await loadTodos();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка при добавлении задачи");
      }
    } finally {
        setLoading(false);
    }
  };
  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <div className={styles.row}>
        <input
          className={styles.input}
          value={newTitle}
          onChange={handleEditTitleChange}
        />
        <button className={styles.addBtn} type="submit">
          <AddIcon />
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
