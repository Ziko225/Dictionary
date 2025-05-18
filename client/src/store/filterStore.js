import { create } from 'zustand';

export const filterStore = create((set, get) => ({
    learned: true,
    unlearned: true,
    backward: false,

    toggleLearned: () => set({ learned: !get().learned }),
    toggleUnlearned: () => set({ unlearned: !get().unlearned }),
    toggleBackward: () => set({ backward: !get().backward }),
}));