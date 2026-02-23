import type { FilterType, TodoInfo } from "@/types/todos";
import styles from "./TodoFilters.module.css";
import type { JSX } from "react";

interface TodoFiltersProps {
  todoFilter: FilterType;
  amountTasks?: TodoInfo;
  onFilterChange: (filter: FilterType) => void;
}

export function TodoFilters({todoFilter, amountTasks, onFilterChange}: TodoFiltersProps): JSX.Element {
  return (
    <div className={styles.filters}>

      <button
        type="button"
        className={`${styles.filterBtn} ${todoFilter === "all" ? styles.active : ""}`}
        onClick={() => onFilterChange("all")}>
        Все {` (${amountTasks?.all ?? 0})`}
      </button>
      <button
        type="button"
        className={`${styles.filterBtn} ${todoFilter === "inWork" ? styles.active : ""}`}
        onClick={() => onFilterChange("inWork")}>
        В работе {` (${amountTasks?.inWork ?? 0})`}
      </button>
      <button
        type="button"
        className={`${styles.filterBtn} ${todoFilter === "completed" ? styles.active : ""}`}
        onClick={() => onFilterChange("completed")}>
        Выполненные {` (${amountTasks?.completed ?? 0})`}
      </button>
    </div>
  );
}
