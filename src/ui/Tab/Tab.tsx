import styles from "./Tab.module.css";
import type { JSX } from "react";

interface TabProps {
  label: string;
  count?: number;
  isActive?: boolean;
  onFilterChange: () => void;
}

export function Tab({
  label,
  count,
  isActive = false,
  onFilterChange,
}: TabProps): JSX.Element {
  return (
    <button
      type="button"
      className={`${styles.filterBtn} ${isActive ? styles.active : ""}`}
      onClick={onFilterChange}
    >
      {label} {count !== undefined && `(${count})`}
    </button>
  );
}
