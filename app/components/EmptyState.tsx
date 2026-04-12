"use client";

import { motion } from "framer-motion";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-[#0f0c29]">
      <div className="text-center flex flex-col items-center">
        {/* Glowing Icon Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
          <div className="relative bg-white/5 border border-white/10 p-6 rounded-full shadow-2xl">
            <HiOutlineChatBubbleLeftRight className="h-12 w-12 text-purple-400" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold tracking-tight text-white"
        >
          Select a chat or start a new conversation
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-gray-400 text-sm"
        >
          Your messages will appear here once you select a friend.
        </motion.p>
      </div>
    </div>
  )
}

export default EmptyState