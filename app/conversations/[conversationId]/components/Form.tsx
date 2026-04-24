'use client'

import useConversation from "@/app/hooks/useConversation"
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";

const Form = () => {
    const {conversationId}  = useConversation();
    const { register , handleSubmit , setValue , formState: { errors}} = useForm<FieldValues>({defaultValues:{
        message:''
    }})

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
      setValue('message','',{shouldValidate: true})
      axios.post('/api/messages',{
        ...data, 
        conversationId
      })
    }

  return (
    <div>
      
      <HiPhoto/>
      <form onSubmit={handleSubmit(onSubmit)}>
    <MessageInput
    id='message' 
    register={register}
    errors={errors}
    required
    placeholder="Write a message"
    />
    <button type="submit">
      <HiPaperAirplane/>

    </button>
      </form>
    </div>
  )
}

export default Form