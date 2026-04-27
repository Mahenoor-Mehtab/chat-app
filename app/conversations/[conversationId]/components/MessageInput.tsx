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
  return (
    <div className="relative w-full">
       <input 
          type={type} 
          id={id} 
          autoComplete={id} 
          {...register(id, { required })} 
          placeholder={placeholder} 
          className="text-white font-medium py-2.5 px-4 bg-white/5 border border-white/10 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
       /> 
    </div>
  )
}

export default MessageInput