import { create } from 'zustand';

export const dictionaryStore = create((set) => ({
    dictionaryData: {
        words: [],
        verbs: [],
    },

    setDictionaryData: (newData, type) => set((previousState) => ({
        dictionaryData: {
            ...previousState.dictionaryData,
            [type]: newData
        }
    })),
}));