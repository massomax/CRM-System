import { CancelIcon, DeleteIcon, EditIcon, SaveIcon } from "../icons/icons";
import styles from "./TodoItem.module.css";
import type { Todo } from "@/types/todos";

export function TodoItem({
  todo,
  updateTitle,
  editingId,
  setEditingId,
  setUpdateTitle,
  onDeleteTodo,
  onUpdateTitle,
  onToggleIsDone,
  onHandleUpdateTitleChange,
}: {
  todo: Todo;
  updateTitle: string;
  editingId: Todo["id"] | null;
  setEditingId: (id: Todo["id"] | null) => void;
  setUpdateTitle: (title: string) => void;
  onDeleteTodo: (id: Todo["id"]) => void;
  onUpdateTitle: (id: Todo["id"], newTitle: string) => void;
  onToggleIsDone: (id: Todo["id"], isDone: boolean) => void;
  onHandleUpdateTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return editingId === todo.id ? (
    <li className={styles.item}>
      <input
        type="text"
        className={styles.editInput}
        value={updateTitle}
        placeholder={todo.title}
        onChange={onHandleUpdateTitleChange}
      />
      <button type="button" onClick={() => setEditingId(null)}>
        <CancelIcon />
      </button>
      <button
        type="button"
        onClick={() => {
          onUpdateTitle(todo.id, updateTitle);
        }}>
        <SaveIcon />
      </button>
    </li>
  ) : (
    <li className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.isDone}
        onChange={(e) => onToggleIsDone(todo.id, e.target.checked)}
      />
      <span className={styles.title}>{todo.title}</span>
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => onDeleteTodo(todo.id)}>
        <DeleteIcon />
      </button>
      <button
        type="button"
        className={styles.editBtn}
        onClick={() => {
          setEditingId(todo.id);
          setUpdateTitle(todo.title);
        }}>
        <EditIcon />
      </button>
    </li>
  );
}
