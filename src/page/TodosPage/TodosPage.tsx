import { useState } from "react";
import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";
import { validateTodoTitle } from "@/utils/validation";

export function TodosPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    setError(null);
  };

  const handleAddTodo = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateTodoTitle(newTitle);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    console.log("Добавлена задача:", result.value);
    setNewTitle("");
    setError(null);
  };

  return (
    <div className={styles.root}>
      <AddTodoForm
        newTitle={newTitle}
        onTitleChange={handleTitleChange}
        onSubmit={handleAddTodo}
        error={error}
      />
      <div className={styles.filters}>
        <button type="button" className={styles.filterBtn}>
          Все
        </button>
        <button type="button" className={styles.filterBtn}>
          В работе
        </button>
        <button type="button" className={styles.filterBtn}>
          Завершено
        </button>
      </div>

      <ul className={styles.list}>
        {editingId !== null ? (
          <li className={styles.item}>
            <input type="checkbox" className={styles.checkbox} disabled />
            <input
              className={styles.input}
              placeholder="введите новое имя задачи"
            />
            <button type="button" className={styles.deleteBtn}>
              Удалить
            </button>
            <button
              type="button"
              className={styles.saveBtn}
              onClick={() => setEditingId(null)}>
              Сохранить
            </button>
          </li>
        ) : (
          <li className={styles.item}>
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.title}>Название задачи</span>
            <button type="button" className={styles.deleteBtn}>
              Удалить
            </button>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => setEditingId(1)}>
              Редактировать
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
