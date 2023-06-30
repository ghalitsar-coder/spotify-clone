import { RoutesProps } from "@/types/components/Sidebar";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

const SidebarItem = ({ href, label, active, icon }: RoutesProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white  transition text-neutral-400 py-1 `,
        active && "text-white"
      )}
    >
      <span className={`[&>svg]:text-[20px]`}> {icon} </span>
      <h3 className="truncate w-full"> {label} </h3>
    </Link>
  );
};

export default SidebarItem;
