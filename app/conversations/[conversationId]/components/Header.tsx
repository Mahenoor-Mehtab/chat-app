'use client'
import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { useMemo } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'

interface HeaderProps {
    conversation : Conversation & {
        users: User[]
    }
}

const Header:React.FC<HeaderProps> = ({conversation}) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(()=>{
      if(conversation.isGroup){
        return `${conversation.users.length} members`;
      }
    return 'Active'
  },[conversation])
   
  return (
    <div className="bg-[#0f0c29]/80 backdrop-blur-xl w-full flex border-b border-white/10 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link 
          href="/conversations" 
          className="lg:hidden block text-purple-400 hover:text-purple-300 transition cursor-pointer"
        >
          <HiChevronLeft size={32}/>
        </Link>
        <Avatar user={otherUser}/>
        <div className="flex flex-col">
          <div className="text-white font-bold">
            {conversation.name || otherUser.name}
          </div>
          <div className="text-xs font-medium text-purple-400">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={()=> { }}
        className="text-gray-400 cursor-pointer hover:text-purple-400 transition"
      />
    </div>
  )
}

export default Header