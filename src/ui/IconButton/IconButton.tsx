import { type JSX, type ReactNode } from "react";
import styles from "./IconButton.module.css";

type IconButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface IconButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  variant?: IconButtonVariant;
  onClick?: () => void;
  ariaLabel: string;
  isDisabled?: boolean;
}

export function IconButton({
  children,
  type = "button",
  variant = "primary",
  onClick,
  ariaLabel,
  isDisabled = false,
}: IconButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={`${styles.iconButton} ${styles[variant]}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
