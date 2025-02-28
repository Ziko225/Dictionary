import { useState } from 'react';

const useAuth = () => {
    const [statuses, setStatuses] = useState({
        isAuth: localStorage.getItem('isAuth') === 'true',
        isOffline: false,
        isLoading: true
    });

    const [userData, setUserData] = useState({
        email: '',
        username: '',
        language: '',
    });

    /**
     * @param {string} status 
     * @param {boolean} value 
     * @returns {void}
     */
    const setStatus = (status, value) => {
        if (status === 'isAuth') {
            localStorage.setItem(status, value);
        }

        setStatuses((prev) => ({
            ...prev,
            [status]: value
        }));
    };

    return {
        setStatus,
        setUserData,
        userData,
        isLoading: statuses.isLoading,
        isAuth: statuses.isAuth,
        isOffline: statuses.isOffline,
    };
};

export default useAuth;
