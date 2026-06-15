import type { FilterType, TodoInfo } from "@/types/todos";
import { type JSX } from "react";

import { Segmented } from "antd";

interface TodoFiltersProps {
  amountTasks?: TodoInfo | null;
  currentTargetFilter: FilterType;
  handleFilterChange: (filter: FilterType) => void;
}

export function TodoFilters({
  amountTasks,
  currentTargetFilter,
  handleFilterChange,
}: TodoFiltersProps): JSX.Element {
  return (
    <Segmented<FilterType>
      value={currentTargetFilter}
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
      onChange={(value) => handleFilterChange(value)}
      style={{ width: "100%" }}
      block
    />
  );
}
