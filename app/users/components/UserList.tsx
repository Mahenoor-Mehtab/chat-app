'use client'

import { User } from "@prisma/client"
import UserBox from "./UserBox"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-white/10 bg-[#0f0c29]/50 backdrop-blur-xl">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-white py-4">
            People 
          </div>
        </div>
        <div className="space-y-1">
          {items.map((item) => (
            <UserBox
              key={item.id}
              data={item}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default UserList