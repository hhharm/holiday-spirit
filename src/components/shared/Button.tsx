import type { ReactNode, ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "tertiary" | "small";
  size?: "normal" | "small";
  children: ReactNode;
}

function Button({
  color = "primary",
  size = "normal",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "button";
  const colorClass = `button--${color}`;
  const sizeClass = `button--${size}`;
  const combinedClassName =
    `${baseClasses} ${colorClass} ${sizeClass} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
