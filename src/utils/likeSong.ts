import { useSessionContext } from "@supabase/auth-helpers-react";
import Router from "next/navigation";
import { toast } from "react-hot-toast";

interface ILikeSong {
  userId: string;
  songId: string;
  isLiking: boolean;
  supabaseClient: any;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const likeSong = async ({
  userId,
  songId,
  setIsLiked,
  setIsLoading,
  supabaseClient,
  isLiking,
}: ILikeSong) => {
  if (isLiking) {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", userId)
        .eq("song_id", songId);
        
      if (error) {
        throw error;
      }
      setIsLiked(false);
      toast.success("Success to unliked the song");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("Something went wrong: " + err.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  } else {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .insert({ song_id: songId, user_id: userId });
      if (error) {
        throw error;
      }
      setIsLiked(true);
      toast.success("Liked");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("Something went wrong: " + err.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }
};
