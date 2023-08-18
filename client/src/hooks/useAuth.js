import { useState } from 'react';
import { httpGet, httpPost } from "../http";

const useAuth = () => {
    const [isAuth, setIsAuth] = useState(true);
    const [isOffline, setIsOffline] = useState(false);

    const check = async () => {
        const response = await httpGet("auth");

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

        const response = await httpPost("auth", { password });
        if (!response?.ok) {
            setIsAuth(false);
            return;
        }

        setIsAuth(true);
    };

    return { login, check, isAuth, isOffline, };
};

export default useAuth;
