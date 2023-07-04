import { useSessionContext } from "@supabase/auth-helpers-react";
import { Song } from "./../../types/stripe";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

export const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    const fetchSong = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("songs")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          throw error;
        }
        setSong(data as Song);
      } catch (err: any) {
        toast.error("Something went wrong", err.message);
        console.error("Error happen", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSong();
  }, [id, supabaseClient]);
  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
  
};
