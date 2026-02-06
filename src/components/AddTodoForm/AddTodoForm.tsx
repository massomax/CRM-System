import { AddIcon } from "../icons/icons";
import styles from "./AddTodoForm.module.css";

interface AddTodoFormProps {
  newTitle: string;
  error: string | null;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export function AddTodoForm({
  newTitle,
  onTitleChange,
  onSubmit,
  error,
}: AddTodoFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.row}>
        <input
          className={styles.input}
          value={newTitle}
          onChange={onTitleChange}
        />
        <button className={styles.addBtn} type="submit">
          <AddIcon />
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
