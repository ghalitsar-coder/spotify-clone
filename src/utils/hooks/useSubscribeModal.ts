import { create } from "zustand";

export interface SubscribeModalStore {
  isOpen: boolean;
  onOpen(type?: string): void;
  onClose(): void;
}

const useSubscribeModal = create<SubscribeModalStore>((set) => ({
  isOpen: false,
  onOpen: (type: string) => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSubscribeModal;
