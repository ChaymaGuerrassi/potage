import { create } from "zustand";

interface AnnounceModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAnnounceModal = create<AnnounceModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAnnounceModal;