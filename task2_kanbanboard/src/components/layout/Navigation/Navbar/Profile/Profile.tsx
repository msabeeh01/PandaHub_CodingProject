"use client";

import { useEffect, useRef, useState } from "react";
import UserIcon from "./UserIcon";
import clsx from "clsx";
import { BiChevronDown } from "react-icons/bi";

interface ProfileProps {
  userName: string;
  location: string;
  src: string;
  children?: React.ReactNode;
  label: string; // for Aria-label
  id: string; //for aria controls
}

const Profile = ({
  userName,
  location,
  src,
  children,
  id,
  label,
}: ProfileProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-brand"
      >
        <div className="flex flex-col gap-0 text-right">
          <p className="text-[16px]">{userName}</p>
          <p className="text-[14px] text-[#787486]">{location}</p>
        </div>

        <div className="flex items-center">
          <UserIcon img={src} />
          <BiChevronDown />
        </div>
      </button>

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

export default Profile;
