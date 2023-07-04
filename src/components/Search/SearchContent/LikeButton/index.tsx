"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { useRouter, useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useAuthModal from "@/utils/hooks/useAuthModal";
import { useUser } from "@/utils/hooks/useUser";
import { likeSong } from "@/utils/likeSong";

interface ILikeButton {
  songId: string;
}

const LikeButton: React.FC<ILikeButton> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      toast.error("User not found");
      return;
    }
    const fetchData = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("liked_songs")
          .select("*")
          .eq("user_id", user?.id)
          .eq("song_id", songId)
          .single();

        if (error) {
          throw error;
        }
        setIsLiked(true);
      } catch (err: any) {}
    };
    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (isLiked) {
      await likeSong({
        setIsLiked,
        setIsLoading,
        supabaseClient,
        userId: user?.id,
        songId,
        isLiking: isLiked,
      });
    } else {
      await likeSong({
        setIsLiked,
        setIsLoading,
        supabaseClient,
        userId: user?.id,
        songId,
        isLiking: isLiked,
      });
    }
    router.refresh();
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className="hover:opacity-75 transition"
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
