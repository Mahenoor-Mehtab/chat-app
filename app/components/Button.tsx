'use client';

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, fullWidth, children, onClick, secondary, danger, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
        flex justify-center rounded-xl px-4 py-3 text-sm font-semibold 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
        transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`,
        fullWidth && "w-full",
        secondary ? "text-gray-300 bg-white/10 hover:bg-white/20" : "text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/20",
        danger && "bg-rose-600 hover:bg-rose-500"
      )}
    >
      {children}
    </button>
  );
};

export default Button;