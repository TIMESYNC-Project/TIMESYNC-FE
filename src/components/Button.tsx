import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSet?: string;
  icon?: ReactNode;
  label?: string;
}
const Button: FC<ButtonProps> = ({ buttonSet, icon, label, ...props }) => {
  return (
    <button
      className={`btn tracking-wider bg-sky text-white border-white hover:border-white shadow-2xl ${buttonSet}`}
      {...props}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
