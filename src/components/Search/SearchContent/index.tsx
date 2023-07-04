"use client";

import MediaItem from "@/components/Library/MediaItem";
import { Song } from "@/types/stripe";
import React from "react";
import LikeButton from "./LikeButton";

interface ISearchContent {
  songs: Song[];
}

const SearchContent: React.FC<ISearchContent> = ({ songs }) => {
  if (!songs.length) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Songs found.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6 ">
      {songs.map((song) => (
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem onClick={() => {}} data={song} />
          </div>
          {/* // TODO: Add like button */}
          <LikeButton songId={song?.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
