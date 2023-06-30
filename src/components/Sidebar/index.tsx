"use client";
import React, { ReactNode, useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import { usePathname } from "next/navigation";
import Box from "../Box";
import SidebarItem from "./SidebarItem";
import { RoutesProps } from "@/types/components/Sidebar";
import Library from "../Library";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const routes: RoutesProps[] = useMemo(
    () => [
      {
        label: "Home",
        active: pathname !== "/search",
        href: "/",
        icon: <HiHome />,
      },
      {
        label: "Search",
        active: pathname === "/search",
        href: "/search",
        icon: <BiSearch />,
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col  gap-y-2 bg-black h-full w-[300px] p-2 ">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4 ">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
