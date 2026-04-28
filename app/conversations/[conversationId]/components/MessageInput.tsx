'use client';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder, id, type, required, register, errors
}) => {
  const hasError = Boolean(errors?.[id]);

  return (
    <div className="relative w-full">
       <input 
          type={type} 
          id={id} 
          autoComplete={id} 
          {...register(id, { required })} 
          placeholder={placeholder}
          aria-invalid={hasError}
          className={`text-white font-medium py-2.5 px-4 bg-white/5 border w-full rounded-full focus:outline-none transition ${
            hasError 
              ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
              : 'border-white/10 focus:ring-2 focus:ring-purple-500'
          }`}
       />
       {hasError && (
         <p className="text-red-500 text-sm mt-1">
           (errors[id]?.message as string) ?? 'This field is required'
         </p>
       )}
    </div>
  )
}

export default MessageInput