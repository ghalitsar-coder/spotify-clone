import { PlayerStore } from "@/types/player";
import { create } from "zustand";

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ activeId: undefined, ids: [] }),
}));

export default usePlayer;
