'use client'
import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }
        return 'Active'
    }, [conversation, otherUser])

    return (
        <>
            <div className="bg-[#0f0c29]/80 backdrop-blur-xl w-full flex border-b border-white/10 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
                <div className="flex gap-3 items-center">
                    <Link
                        href="/conversations"
                        className="lg:hidden block text-purple-400 hover:text-purple-300 transition cursor-pointer"
                    >
                        <HiChevronLeft size={32} />
                    </Link>
                    <Avatar user={otherUser} />
                    <div className="flex flex-col">
                        <div className="text-white font-bold">
                            {conversation.name || otherUser?.name}
                        </div>
                        <div className="text-xs font-medium text-purple-400">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}  // ✅ drawer open
                    className="text-gray-400 cursor-pointer hover:text-purple-400 transition"
                />
            </div>

            {/* Drawer — profile/details panel */}
            {drawerOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Background overlay */}
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setDrawerOpen(false)}  // ✅ bahar click karo toh band
                    />
                    {/* Drawer panel */}
                    <div className="relative w-80 bg-[#0f0c29] h-full shadow-xl p-6 flex flex-col gap-4 z-10">
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="text-purple-400 hover:text-purple-300 self-end"
                        >
                            ✕
                        </button>
                        <Avatar user={otherUser} />
                        <div className="text-white font-bold text-xl">
                            {conversation.name || otherUser?.name}
                        </div>
                        <div className="text-purple-400 text-sm">
                            {statusText}
                        </div>
                        {!conversation.isGroup && (
                            <div className="text-gray-400 text-sm">
                                {otherUser?.email}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Header