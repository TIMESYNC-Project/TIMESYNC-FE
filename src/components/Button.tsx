import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSet?: string;
  icon?: ReactNode;
  label?: string;
}
const Button: FC<ButtonProps> = ({ buttonSet, icon, label, ...props }) => {
  return (
    <button
      className={`flex justify-center items-center tracking-wider bg-sky text-white border-white hover:border-white shadow-md shadow-gray-600 duration-300 active:scale-90 ${buttonSet}`}
      {...props}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
