'use client'
import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ href, icon: Icon, active, onClick }) => {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className={clsx(`
        group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 transition-all
      `,
        active ? "text-purple-400" : "text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  )
}

export default MobileItem