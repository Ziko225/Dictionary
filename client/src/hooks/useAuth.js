import { useState } from 'react';
import useHttp from './useHttp';

const useAuth = () => {
    const [isAuth, setIsAuth] = useState(true);
    const [isOffline, setIsOffline] = useState(false);

    const getApi = useHttp();

    const check = async () => {
        const response = await getApi("auth", "GET");

        if (!response) {
            setIsOffline(true);
            return;
        }

        setIsOffline(false);

        if (!response?.ok) {
            setIsAuth(false);
            return;
        }

        setIsAuth(true);
    };

    const login = async (e, password) => {
        e.preventDefault(e);

        const response = await getApi("auth", "POST",{ password });
        if (!response?.ok) {
            setIsAuth(false);
            return;
        }

        setIsAuth(true);
    };

    return { login, check, isAuth, isOffline, setIsOffline };
};

export default useAuth;
