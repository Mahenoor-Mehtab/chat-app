'use client'

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = () => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
        <nav>
            <ul role="list">
                {
                    routes.map((items) => (
                        <DesktopItem key={items.label} label={items.label} href={items.href} icon={items.icon} active={items.active} onClick={items.onClick} />
                    ))
                }

            </ul>

        </nav>
    </div>
  )
}

export default DesktopSidebar