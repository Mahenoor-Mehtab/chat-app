'use client'

import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { HiChevronLeft, HiTrash } from 'react-icons/hi' // Added HiTrash
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { format } from 'date-fns' // Ensure date-fns is installed

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
    }, [conversation])

    // Format the "Joined" date
    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

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
                    onClick={() => setDrawerOpen(true)}
                    className="text-gray-400 cursor-pointer hover:text-purple-400 transition"
                />
            </div>

            {drawerOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setDrawerOpen(false)}
                    />
                    <div className="relative w-80 bg-[#0f0c29] border-l border-white/10 h-full shadow-2xl p-6 flex flex-col z-10 transition-transform">
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="text-gray-400 hover:text-white self-end p-2 transition"
                        >
                            ✕
                        </button>
                        
                        <div className="flex flex-col items-center gap-4 mt-4">
                            <Avatar user={otherUser} />
                            <div className="text-center">
                                <div className="text-white font-bold text-xl">
                                    {conversation.name || otherUser?.name}
                                </div>
                                <div className="text-purple-400 text-sm mt-1">
                                    {statusText}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-6">
                            {!conversation.isGroup && (
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</dt>
                                    <dd className="text-sm text-gray-200 mt-1">{otherUser?.email}</dd>
                                </div>
                            )}
                            
                            <div>
                                <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</dt>
                                <dd className="text-sm text-gray-200 mt-1">{joinedDate}</dd>
                            </div>
                        </div>

                        {/* Delete Section */}
                        <div className="mt-auto pb-10">
                            <button
                                onClick={() => {/* Trigger your delete modal/API here */}}
                                className="w-full flex items-center justify-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500/20 transition group"
                            >
                                <HiTrash size={20} className="group-hover:scale-110 transition" />
                                <span className="font-semibold">Delete Chat</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header