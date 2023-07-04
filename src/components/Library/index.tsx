"use client";
import React from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/utils/hooks/useAuthModal";
import { useUser } from "@/utils/hooks/useUser";
import { SIGN_IN } from "@/constants";
import useUploadModal from "@/utils/hooks/useUploadModal ";
import { Song } from "@/types/stripe";
import MediaItem from "./MediaItem";

interface ILibrary {
  songs: Song[];
}

const Library: React.FC<ILibrary> = ({ songs }) => {
  const { onOpen } = useAuthModal();
  const { onOpen: onOpenUploadModal } = useUploadModal();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      onOpen(SIGN_IN);
    } else {
      // TODO: check subscription user
      onOpenUploadModal();
    }
  };
  return (
    <div className={`flex flex-col`}>
      <div className="flex items-center justify-between px-5 pt-4 ">
        <div className="inline-flex items-center gap-x-2">
          {" "}
          <TbPlaylist className="text-neutral-400" size={26} />{" "}
          <p className={`text-neutral-400 font-medium text-md`}>
            {" "}
            Your Library{" "}
          </p>
        </div>
        <AiOutlinePlus
          size={20}
          onClick={onClick}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3 text-white">
        {songs?.map((item) => (
          <MediaItem onClick={() => {}} data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Library;
