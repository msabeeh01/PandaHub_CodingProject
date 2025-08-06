"use client"

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface DropdownIconProps {
  icon: React.ReactNode;
  children?: React.ReactNode;
  label: string; // for Aria-label
  id: string; //for aria controls
}

const DropdownIcon = ({ icon, label, children, id }: DropdownIconProps) => {
  const [open, setOpen] = useState(false);
  //used to detect outside clicks of the icon
  const ref = useRef<HTMLDivElement>(null);

  //detect outside click and close open menus
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)){
                setOpen(false)
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [])

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((prev) => !prev)}>{icon}</button>

      <ul
        id={id}
        role="menu"
        className={clsx(
          "absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50",
          !open && "hidden"
        )}
      >
        {children}
      </ul>
    </div>
  );
};

export default DropdownIcon;
