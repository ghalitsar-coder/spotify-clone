import { create } from "zustand";

export interface AuthModalStore {
  isOpen: boolean;
  authType: string;
  onOpen(type?: string): void;
  onClose(): void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  authType: "",
  onOpen: (type: string) => set({ isOpen: true, authType: type }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
