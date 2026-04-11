import React from 'react'
import clsx from 'clsx';
import Link from "next/link";

interface DesktopItemProps {
    label: string;
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const DesktopItem:React.FC<DesktopItemProps> = ({ label, href, icon: Icon, active, onClick }) => {
    const handleClick = () => {
        if(onClick) {
            return onClick();
        }
    }
  return (
    <div onClick={handleClick}>
        <Link href={href}>
            <Icon />
            <span className={clsx("ml-4", active ? "text-black" : "text-gray-500")}>
                {label}
            </span>
        </Link>

    </div>
  )
}

export default DesktopItem