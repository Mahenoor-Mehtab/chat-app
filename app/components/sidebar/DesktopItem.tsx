'use client'
import clsx from 'clsx';
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({ label, href, icon: Icon, active, onClick }) => {
  const handleClick = () => {
    if (onClick) return onClick();
  }

  return (
    <li onClick={handleClick} className="list-none">
      <Link 
        href={href}
        className={clsx(`
          group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold transition-all duration-200
          hover:bg-white/10
        `, 
          active ? "bg-white/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "text-gray-400 hover:text-white"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem