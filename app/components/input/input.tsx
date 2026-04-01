'use client';

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({ id, label, type = "text", disabled, required, register, errors }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-gray-400 ml-1 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(`
          block w-full rounded-xl border-0 py-3 bg-white/5 text-white shadow-sm ring-1 ring-inset 
          ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-purple-500 
          transition-all duration-200 outline-none sm:text-sm sm:leading-6`,
          errors[id] && "focus:ring-rose-500 ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
  );
};

export default Input;