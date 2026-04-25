import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/types'
import React, { useRef, useState } from 'react'
import MessageBox from '@/app/conversations/[conversationId]/components/MessageBox'

interface BodyProps {
   initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({initialMessages}) => {
  const [messages , setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId} = useConversation();



  return (
    <div>
      {
        messages.map((message, i)=>(
          <MessageBox
          isLast = { i=== messages.length -1}
          key={message.id}
          data = {message}
          />
        ))
      }
     <div ref={bottomRef}/>

    </div>
  )
}

export default Body


// Naya message aaya
//       ↓
// bottomRef wali div pe scroll karo
//       ↓
// User automatically neeche aa jaata hai