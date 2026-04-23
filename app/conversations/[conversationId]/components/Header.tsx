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
    <div>
    <div>
      <Link href="/conversation">
      <HiChevronLeft size={32}/>
      </Link>
      <Avatar user={otherUser}/>
      <div>
        <div>
          {conversation.name || otherUser.name}
        </div>

        <div>
          { statusText}
        </div>

      </div>
    </div>
<HiEllipsisHorizontal
onClick={()=> { }}
/>
    </div>
  )
}

export default Header