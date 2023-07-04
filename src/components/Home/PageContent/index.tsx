"use client";

import { Song } from "@/types/stripe";
import React from "react";
import SongItem from "./SongItem";
import { useOnPlay } from "@/utils/hooks/useOnPlay";
interface IPageContent {
  songs: Song[];
}

const PageContent: React.FC<IPageContent> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (!songs.length) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }
  
  return (
    <div
      className={
        "grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4 text-white "
      }
    >
      {songs?.map((item) => (
        <SongItem onClick={(id) => onPlay(id)} data={item} key={item.id} />
      ))}
    </div>
  );
};

export default PageContent;
