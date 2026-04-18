'use client'
import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/app/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import React, { useCallback, useMemo } from 'react'
import clsx from 'clsx'

interface ConversationBoxProps{
    data: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({data, selected}) => {
     const otherUser = useOtherUser(data)
     const session = useSession();
     const router = useRouter();

     const handleClick = useCallback(()=>{
      router.push(`/conversations/${data.id}`)
     },[data.id, router])

     const lastMessage = useMemo(()=>{
      const messages = data.messages || []
      return messages[messages.length - 1];
     },[data.messages])

     const userEmail = useMemo(()=>{
      return session.data?.user?.email;
     },[session.data?.user?.email])

     const hasSeen = useMemo(()=>{
        if(!lastMessage) return false
        const seenArray = lastMessage.seen || [];
        if(!userEmail) return false
        return seenArray.filter((user) => user.email === userEmail).length !== 0;
     },[userEmail, lastMessage])

  const lastMessageText = useMemo(()=>{
    if(lastMessage?.image) return "Sent a photo 📷"
    if(lastMessage?.body) return lastMessage.body
    return "Started a conversation"
  },[lastMessage])

  return (
    <div 
      onClick={handleClick}
      className={clsx(`
        w-full relative flex items-center space-x-3 p-3 
        hover:bg-white/5 rounded-2xl transition cursor-pointer mb-1
      `,
        selected ? 'bg-white/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-transparent'
      )}
    >
      <Avatar user={otherUser}/>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-bold text-white">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-500 font-medium">
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p className={clsx(`
            truncate text-sm transition-colors
          `,
            hasSeen ? 'text-gray-500 font-normal' : 'text-purple-400 font-semibold'
          )}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox