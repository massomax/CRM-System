import { useEffect, useState } from "react";
import { AddTodoForm } from "@components/AddTodoForm/AddTodoForm";

import styles from "./TodosPage.module.css";
import { validateTodoTitle } from "@/utils/validation";
import { getTodos, createTodo } from "@/api/todosApi";

import type { Todo } from "@/types/todos";

export function TodosPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    setError(null);
  };

  const handleAddTodo = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = validateTodoTitle(newTitle);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setLoading(true);
      setError(null);

      await createTodo({ title: result.value });

      setNewTitle("");
      await loadTodos();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Ошибка при добавлении задачи:", error.message);
      } else {
        setError("Неизвестная ошибка при добавлении задачи");
        console.error("Неизвестная ошибка при добавлении задачи");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Ошибка при загрузке задач:", error.message);
      } else {
        setError("Неизвестная ошибка при загрузке задач");
        console.error("Неизвестная ошибка при загрузке задач");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

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
      {loading ? (
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
      )}
    </div>
  );
}
