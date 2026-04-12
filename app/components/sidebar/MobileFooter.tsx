'use client'

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) return null;

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-[#0f0c29]/90 backdrop-blur-lg border-t border-white/10 lg:hidden px-2 py-1 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
      {routes.map((route) => (
        <MobileItem 
          key={route.label} 
          href={route.href} 
          icon={route.icon} 
          active={route.active} 
          onClick={route.onClick} 
        />
      ))}
    </div>
  )
}   

export default MobileFooter