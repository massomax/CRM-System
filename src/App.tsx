import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <input className={styles.input} />
        <button className={styles.addBtn}>Добавить</button>
      </div>
      <div className={styles.filters}>
        <button className={styles.filterBtn}>Все</button>
        <button className={styles.filterBtn}>В работе</button>
        <button className={styles.filterBtn}>Завершено</button>
      </div>

      <ul className={styles.list}>
        {isEdit ? (
          <li className={styles.item}>
            <input type="checkbox" className={styles.checkbox} disabled />
            <input
              className={styles.input}
              placeholder="введите новое имя задачи"
            />
            <button className={styles.deleteBtn}>Удалить</button>
            <button
              className={styles.saveBtn}
              onClick={() => setIsEdit(!isEdit)}>
              Сохранить
            </button>
          </li>
        ) : (
          <li className={styles.item}>
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.title}>Название задачи</span>
            <button className={styles.deleteBtn}>Удалить</button>
            <button
              className={styles.editBtn}
              onClick={() => setIsEdit(!isEdit)}>
              Редактировать
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
