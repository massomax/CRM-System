import styles from "./TodoItem.module.css";
import type { Todo } from "@/types/todos";

export function TodoItem({
  key,
  todo,
  editingId,
  setEditingId,
  onDeleteTodo,
  handleUpdateTitle,
  handleToggleIsDone,
}: {
  todo: Todo;
  handleUpdateTitle: (id: Todo["id"], newTitle: string) => void;
  setEditingId: (id: Todo["id"] | null) => void;
  onDeleteTodo: (id: Todo["id"]) => void;
  editingId: number | null;
  key: Todo["id"];
  handleToggleIsDone: (id: Todo["id"], isDone: boolean) => void;
}) {
  return editingId === todo.id ? (
    <li key={key} className={styles.item}>
      <input
        type="text"
        className={styles.editInput}
        defaultValue={todo.title}
        onBlur={(e) => {
          handleUpdateTitle(todo.id, e.target.value);
          setEditingId(null);
        }}
      />
      <button onClick={() => setEditingId(null)}>Отменить</button>
    </li>
  ) : (
    <li key={key} className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        defaultChecked={todo.isDone}
        onClick={() => handleToggleIsDone(todo.id, !todo.isDone)}
      />
      <span className={styles.title}>{todo.title}</span>
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => onDeleteTodo(todo.id)}>
        Удалить
      </button>
      <button
        type="button"
        className={styles.editBtn}
        onClick={() => {
          setEditingId(todo.id);
        }}>
        Редактировать
      </button>
    </li>
  );
}
