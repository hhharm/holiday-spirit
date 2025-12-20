import type { ReactNode, ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "tertiary" | "small";
  size?: "normal" | "small";
  children?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

function Button({
  color = "primary",
  size = "normal",
  startIcon,
  children,
  className = "",
  endIcon,
  ...props
}: ButtonProps) {
  const baseClasses = "button";
  const colorClass = `button--${color}`;
  const sizeClass = `button--${size}`;
  const combinedClassName =
    `${baseClasses} ${colorClass} ${sizeClass} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {startIcon ? startIcon : null}
      {children ? children : null}
      {endIcon ? endIcon : null}
    </button>
  );
}

export default Button;
