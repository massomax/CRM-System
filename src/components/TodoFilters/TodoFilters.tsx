import type { FilterType, TodoInfo } from "@/types/todos";
import { type JSX } from "react";

import { Segmented } from "antd";
import { useSearchParams } from "react-router";

interface TodoFiltersProps {
  amountTasks?: TodoInfo;
}

export function TodoFilters({ amountTasks }: TodoFiltersProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter: FilterType = searchParams.get("filter") as FilterType;

  const handleFilterChange = (value: FilterType) => {
    setSearchParams({ filter: value });
  };
  return (
    <Segmented<FilterType>
      value={currentFilter}
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
