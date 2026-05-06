import styles from "./Input.module.css";
import type { JSX } from "react";

interface InputProps {
  value: string;
  placeholder?: string;
  isDisabled?: boolean;
  handleEditTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  value,
  placeholder,
  isDisabled,
  handleEditTitleChange,
}: InputProps): JSX.Element {
  return (
    <input
      className={styles.input}
      value={value}
      placeholder={placeholder}
      disabled={isDisabled}
      onChange={handleEditTitleChange}
    />
  );
}
