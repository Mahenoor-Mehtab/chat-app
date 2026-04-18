'use client'
import useConversation from '@/app/hooks/useConversation';
import { FullConversationType } from '@/app/types'
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';

interface ConversationListProps{
    initialItems : FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({initialItems}) => {
  const [items, setItems] = useState(initialItems)
  const router = useRouter()
  const {conversationId, isOpen} = useConversation();

  return (
    <aside className={clsx(`
      fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto 
      border-r border-white/10 bg-[#0f0c29]/50 backdrop-blur-xl
    `, 
      isOpen ? 'hidden' : 'block w-full left-0'
    )}>
      <div className="px-5">
        <div className="flex justify-between items-center mb-4 pt-4">
          <div className="text-2xl font-bold text-white">
            Messages
          </div>
          <div className="
            rounded-full p-2 bg-white/5 text-gray-400 cursor-pointer 
            hover:text-purple-400 hover:bg-white/10 transition shadow-sm
          ">
            <MdOutlineGroupAdd size={20}/>
          </div>
        </div>
        <div className="space-y-1">
          {items.map((item)=>(
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default ConversationList