import { Song } from "@/types/stripe";
import { useLoadImage } from "@/utils/hooks/useLoadImage";
import usePlayer from "@/utils/hooks/usePlayer";
import Image from "next/image";
import React from "react";

interface IMediaItem {
  data: Song;
  onClick?: (id: string) => void;
  playing?: boolean;
}

const MediaItem: React.FC<IMediaItem> = ({ data, onClick, playing }) => {
  const imageUrl = useLoadImage(data);
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    // TODO: Default turn on player
    // return player.setId(data.id);
  };

  return (
    <div
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md "
      onClick={handleClick}
    >
      <figure
        className={`${
          playing ? "!rounded-full animate-spin-continuous    " : " rounded-md"
        } relative min-h-[48px] min-w-[48px] overflow-hidden `}
      >
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="image-song"
          className="object-cover"
        />
      </figure>
      <div className="flex flex-col gap-y-1 overflow-hidden ">
        <p className="text-white truncate"> {data.title} </p>
        <p className="text-neutral-400 text-sm truncate"> {data.author} </p>
      </div>
    </div>
  );
};

export default MediaItem;
