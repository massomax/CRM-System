import type { FilterType, TodoInfo } from "@/types/todos";
import type { JSX } from "react";

import { Segmented } from "antd";

interface TodoFiltersProps {
  todoFilter: FilterType;
  amountTasks?: TodoInfo;
  onFilterChange: (filter: FilterType) => void;
}

export function TodoFilters({
  amountTasks,
  onFilterChange,
}: TodoFiltersProps): JSX.Element {
  return (
    <Segmented<FilterType>
      options={[
        {
          label: <div>Все {amountTasks?.all}</div>,
          value: "all",
        },
        { label: <div>В Работе {amountTasks?.inWork}</div>, value: "inWork" },
        {
          label: <div>Завершенные {amountTasks?.completed}</div>,
          value: "completed",
        },
      ]}
      onChange={(value) => onFilterChange(value)}
      style={{ width: "100%" }}
      block
    />
  );
}
