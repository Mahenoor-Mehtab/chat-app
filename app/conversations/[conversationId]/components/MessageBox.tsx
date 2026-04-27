'use client'
import Avatar from '@/app/components/Avatar'
import { FullMessageType} from '@/app/types'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface MessageBoxProps {
    data: FullMessageType,
    isLast?: boolean
}

const MessageBox:React.FC<MessageBoxProps>  = ({data, isLast}) => {
  const session = useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end")
  const avatar = clsx(isOwn && "order-2")
  const body = clsx("flex flex-col gap-2", isOwn && "items-end")
  
  const message = clsx(
    "text-sm w-fit overflow-hidden transition-all duration-200", 
    isOwn 
      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20' 
      : "bg-white/10 text-gray-200 border border-white/10",
    data.image ? "rounded-2xl p-0" : "rounded-2xl py-2.5 px-4"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender}/>
      </div>
      <div className={body}>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-400 font-semibold">
            {data.sender.name}
          </div>
          <div className="text-[10px] text-gray-500">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image 
              alt='Image' 
              height="288" 
              width="288" 
              src={data.image} 
              className="object-cover cursor-pointer hover:scale-105 transition translate" 
            />
          ) : (
            <div className="leading-relaxed">{data.body}</div>
          )}
        </div>
        {isLast && isOwn && data.seen && data.seen.length > 0 && (
          <div className="text-[10px] font-medium text-purple-400 italic">
            Seen
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBox