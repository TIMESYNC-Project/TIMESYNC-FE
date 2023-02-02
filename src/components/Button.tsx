import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSet?: string;
  label?: string;
}
const Button: FC<ButtonProps> = ({ buttonSet, label, ...props }) => {
  return (
    <button
      className={`btn tracking-wider bg-[#3282B8] text-white border-white hover:border-white shadow-2xl ${buttonSet}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
