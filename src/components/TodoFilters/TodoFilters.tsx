import type { FilterType } from "@/types/todos";
import { type JSX } from "react";

import { Segmented } from "antd";
import { useAppSelector } from "@/store/hooks";
import { selectFilterTodos, selectTodosInfo } from "@/store/todos/selectors";

interface TodoFiltersProps {
  handleFilterChange: (filter: FilterType) => void;
}

export function TodoFilters({
  handleFilterChange,
}: TodoFiltersProps): JSX.Element {
  const amountTasks = useAppSelector(selectTodosInfo);
  const currentTargetFilter = useAppSelector(selectFilterTodos);
  return (
    <Segmented<FilterType>
      value={currentTargetFilter}
      options={[
        {
          label: <div>Все {amountTasks?.all ?? 0} </div>,
          value: "all",
        },
        {
          label: <div>В Работе {amountTasks?.inWork ?? 0}</div>,
          value: "inWork",
        },
        {
          label: <div>Завершенные {amountTasks?.completed ?? 0}</div>,
          value: "completed",
        },
      ]}
      onChange={(value) => handleFilterChange(value)}
      style={{ width: "100%" }}
      block
    />
  );
}
