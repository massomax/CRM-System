import type { filterType, TodoInfo } from "@/types/todos";
import styles from "./TodoFilters.module.css";

interface TodoFiltersProps {
  filter: filterType;
  countTask?: TodoInfo;
  onFilterChange: (filter: filterType) => void;
}

export function TodoFilters({ ...props }: TodoFiltersProps) {
  return (
    <div className={styles.filters}>
      <button
        type="button"
        className={`${styles.filterBtn} ${props.filter === "all" ? styles.active : ""}`}
        onClick={() => props.onFilterChange("all")}>
        Все {` (${props.countTask?.all ?? 0})`}
      </button>{" "}
      <button
        type="button"
        className={`${styles.filterBtn} ${props.filter === "inWork" ? styles.active : ""}`}
        onClick={() => props.onFilterChange("inWork")}>
        В работе {` (${props.countTask?.inWork ?? 0})`}
      </button>
      <button
        type="button"
        className={`${styles.filterBtn} ${props.filter === "completed" ? styles.active : ""}`}
        onClick={() => props.onFilterChange("completed")}>
        Выполненные {` (${props.countTask?.completed ?? 0})`}
      </button>
    </div>
  );
}
