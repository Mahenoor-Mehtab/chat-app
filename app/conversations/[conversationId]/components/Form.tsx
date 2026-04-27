'use client'
import useConversation from "@/app/hooks/useConversation"
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const {conversationId}  = useConversation();
    const { register, handleSubmit, setValue, formState: { errors }} = useForm<FieldValues>({
        defaultValues: { message: '' }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setValue('message', '', { shouldValidate: true })
      axios.post('/api/messages', { ...data, conversationId })
    }

    const handleUpload = (result : any) => {
      axios.post('/api/messages', {
       image: result?.info?.secure_url || result?.secure_url,
        conversationId
      })
    }

  return (
    <div className="py-4 px-4 bg-[#0f0c29] border-t border-white/10 flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton 
        options={{maxFiles: 1}} 
       onSuccess={handleUpload}   
        uploadPreset="iwtjgpsc"
      >
        <HiPhoto size={30} className="text-purple-400 hover:text-purple-300 transition cursor-pointer" />
      </CldUploadButton>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput 
          id='message' 
          register={register} 
          errors={errors} 
          required 
          placeholder="Write a message..." 
        />
        <button 
          type="submit" 
          className="rounded-full p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 cursor-pointer hover:opacity-80 transition shadow-md shadow-purple-500/20"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}

export default Form