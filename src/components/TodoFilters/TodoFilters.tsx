import type { filterType } from "@/types/todos";
import styles from "./TodoFilters.module.css";

export function TodoFilters({
  onFilterChange,
  filter,
}: {
  onFilterChange: (filter: filterType) => void;
  filter: filterType;
}) {
  return (
    <div className={styles.filters}>
      <button
        type="button"
        className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
        onClick={() => onFilterChange("all")}>
        Все
      </button>
      <button
        type="button"
        className={`${styles.filterBtn} ${filter === "inWork" ? styles.active : ""}`}
        onClick={() => onFilterChange("inWork")}>
        В работе
      </button>
      <button
        type="button"
        className={`${styles.filterBtn} ${filter === "completed" ? styles.active : ""}`}
        onClick={() => onFilterChange("completed")}>
        Завершено
      </button>
    </div>
  );
}
