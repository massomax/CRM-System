import type { filterType, TodoInfo } from "@/types/todos";
import styles from "./TodoFilters.module.css";

export function TodoFilters({
  onFilterChange,
  filter,
  countTask,
}: {
  onFilterChange: (filter: filterType) => void;
  filter: filterType;
  countTask?: TodoInfo;
}) {
  return (
    <div className={styles.filters}>
      <button
        type="button"
        className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
        onClick={() => onFilterChange("all")}>
        Все {` (${countTask?.all ?? 0})`}
      </button>{" "}
      <button
        type="button"
        className={`${styles.filterBtn} ${filter === "inWork" ? styles.active : ""}`}
        onClick={() => onFilterChange("inWork")}>
        В работе {` (${countTask?.inWork ?? 0})`}
      </button>
      <button
        type="button"
        className={`${styles.filterBtn} ${filter === "completed" ? styles.active : ""}`}
        onClick={() => onFilterChange("completed")}>
        Выполненные {` (${countTask?.completed ?? 0})`}
      </button>
    </div>
  );
}
