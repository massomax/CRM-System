import styles from "./TodoList.module.css";
import type { Todo } from "@/types/todos";

export function TodoList({ todos, loading, error, setEditingId } : {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  setEditingId: (id: number | null) => void;
}) {
  return (
    loading ? (
        <p>Загрузка задач...</p>
      ) : error ? (
        <p className={styles.error}>Ошибка: {error}</p>
      ) : todos.length === 0 ? (
        <p>Задачи не найдены</p>
      ) : (
        <ul className={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.item}>
              <input
                type="checkbox"
                className={styles.checkbox}
                defaultChecked={todo.isDone}
              />
              <span className={styles.title}>{todo.title}</span>
              <button type="button" className={styles.deleteBtn}>
                Удалить
              </button>
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => setEditingId(todo.id)}>
                Редактировать
              </button>
            </li>
          ))}
        </ul>
      )
  );
}