"use client";
import { HeaderProps } from "@/types/components/Header";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import {
  authNavigation,
  mobileNavigations,
  routeNavigation,
} from "./constants";
import Button from "../Button";
import useAuthModal from "@/utils/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/utils/hooks/useUser";
import { DropDownProfile } from "./DropDownProfile";
import { toast } from "react-hot-toast";

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    
    // TODO: Reset any playing songs

    router.refresh();
    if (error) {
      toast.error(error.message);
    }
  };
  const handleRouteNavigation = (name: string) => {
    if (name === "left") {
      router.back();
      return;
    }
    router.forward();
  };
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6 `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between ">
        <div className="hidden md:flex gap-x-2 items-center">
          {routeNavigation.map((item, idx: number) => (
            <button
              key={idx}
              onClick={() => handleRouteNavigation(item.name)}
              className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition [&>svg]:text-white [&>svg]:text-[35px] "
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          {mobileNavigations.map((item) => (
            <button
              key={item.label}
              className={
                "rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition [&>svg]:text-black [&>svg]:text-[20px]  "
              }
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button className="bg-white px-6 py-1.5" onClick={handleLogout}>
                Logout
              </Button>
              <DropDownProfile />
            </div>
          ) : (
            authNavigation.map((item) => (
              <Button
                key={item.label}
                onClick={() => onOpen(item.label)}
                className={item.className}
              >
                {item.label}
              </Button>
            ))
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
