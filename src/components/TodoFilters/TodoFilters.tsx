import styles from "./TodoFilters.module.css";

export function TodoFilters({
  onFilterChange,
}: {
  onFilterChange: (filter: string) => void;
}) {
  return (
    <div className={styles.filters}>
      <button
        type="button"
        className={styles.filterBtn}
        onClick={() => onFilterChange("all")}>
        Все
      </button>
      <button
        type="button"
        className={styles.filterBtn}
        onClick={() => onFilterChange("inWork")}>
        В работе
      </button>
      <button
        type="button"
        className={styles.filterBtn}
        onClick={() => onFilterChange("completed")}>
        Завершено
      </button>
    </div>
  );
}
