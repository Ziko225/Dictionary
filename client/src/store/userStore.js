import { create } from 'zustand';

export const userStore = create((set) => ({
    isAuth: localStorage.getItem('isAuth') === 'true',
    isLoading: false,
    userData: {
        email: '',
        username: '',
        language: '',
    },

    changeIsAuth: (newValue) => {
        localStorage.setItem('isAuth', newValue);
        set({ isAuth: newValue });
    },

    changeIsLoading: (newIsLoadingValue) => {
        set({ isLoading: newIsLoadingValue });
    },

    changeUserData: (newUserData) => {
        set({ userData: newUserData });
    },
}));