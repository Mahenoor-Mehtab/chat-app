'use client'

import Avatar from "@/app/components/Avatar"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import clsx from "clsx"

interface UserBoxProps {
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true)

        axios.post('/api/conversations', {
            userId: data.id 
        })
        .then((data) => {
            router.push(`/conversations/${data.data.id}`)
        })
        .finally(() => setIsLoading(false))

    }, [data, router])

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 p-3 hover:bg-white/5 rounded-2xl transition cursor-pointer mb-1 group"
    >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                       {data.name} 
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserBox