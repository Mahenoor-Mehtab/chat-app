"use client";

import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#0f0c29] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#302b63] via-[#0f0c29] to-black overflow-y-auto">
      
     
      <div className="sm:mx-auto sm:w-full sm:max-w-md min-h-[160px] flex flex-col justify-end">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mx-auto w-16 h-16 mt-4">
            <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-30 rounded-full animate-pulse"></div>
            <Image 
              alt="Logo" 
              height="64" 
              width="64" 
              className="relative mx-auto object-contain" 
              src="/images/logo.png"
            />
          </div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white">
            Messenger
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8"
      >
        <AuthForm />
      </motion.div>
    </div>
  );
}