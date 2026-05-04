import type { FilterType, TodoInfo } from "@/types/todos";
import styles from "./TodoFilters.module.css";
import type { JSX } from "react";

import { Tab } from "@/ui/Tab/Tab";

interface TodoFiltersProps {
  todoFilter: FilterType;
  amountTasks?: TodoInfo;
  onFilterChange: (filter: FilterType) => void;
}

export function TodoFilters({
  todoFilter,
  amountTasks,
  onFilterChange,
}: TodoFiltersProps): JSX.Element {
  return (
    <div className={styles.filters}>
      <Tab
        label={"Все"}
        count={amountTasks?.all}
        isActive={todoFilter === "all"}
        onFilterChange={() => onFilterChange("all")}
      />
      <Tab
        label={"В Работе"}
        count={amountTasks?.inWork}
        isActive={todoFilter === "inWork"}
        onFilterChange={() => onFilterChange("inWork")}
      />
      <Tab
        label={"Завершенные"}
        count={amountTasks?.completed}
        isActive={todoFilter === "completed"}
        onFilterChange={() => onFilterChange("completed")}
      />
    </div>
  );
}
