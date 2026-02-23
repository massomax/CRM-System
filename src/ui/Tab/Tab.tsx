import type { FilterType } from "@/types/todos"
import styles from "./Tab.module.css"
import type { JSX } from "react";

interface TabProps {
  typeTab: FilterType;
  onFilterChange: (filter: FilterType) => void;

}

export function Tab({ typeTab, onFilterChange }: TabProps): JSX.Element {
  const title = typeTab === "all" ? "Все" : typeTab === "inWork" ? "В работе" : "Выполненные";

    return (
        <button
        type="button"
        className={`${styles.filterBtn} ${typeTab === typeTab ? styles.active : ""}`}
        onClick={() => onFilterChange(typeTab)}>
         ${title} ${amountTasks?.typeTab ?? 0}
      </button>
    )
}

