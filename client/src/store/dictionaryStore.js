import { create } from 'zustand';

export const dictionaryStore = create((set) => ({
    words: [],
    verbs: [],

    setWords: (newData) => set({ words: newData }),

    setVerbs: (newData) => set({ verbs: newData }),
}));